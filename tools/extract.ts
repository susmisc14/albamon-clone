import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_URL = "https://m.albamon.com/jobs/search/detail-conditions";
const OUT_DIR = path.resolve("extracted");

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  await ensureDir(OUT_DIR);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
    deviceScaleFactor: 2,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });

  await context.addInitScript(() => {
    const fixed = new Date("2024-01-01T09:00:00+09:00").valueOf();
    // @ts-ignore
    const _Date = Date;
    // @ts-ignore
    class FixedDate extends _Date {
      constructor(...args: any[]) {
        super();
        if (args.length === 0) return new _Date(fixed);
        // @ts-ignore
        return new _Date(...(args as any));
      }
      static now() {
        return fixed;
      }
    }
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    Date = FixedDate as any;
    Math.random = () => 0.123456789;
    const style = document.createElement("style");
    style.textContent = "*{animation:none!important;transition:none!important}";
    document.documentElement.appendChild(style);
  });

  const page = await context.newPage();
  await page.goto(TARGET_URL, { waitUntil: "networkidle" });

  const html = await page.content();
  await fs.writeFile(path.join(OUT_DIR, "index.html"), html, "utf8");

  const { hrefs, inlineStyles } = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    );
    const styles = Array.from(document.querySelectorAll("style"));
    return {
      hrefs: links.map((l) => (l as HTMLLinkElement).href).filter(Boolean),
      inlineStyles: styles.map((s) => s.textContent || "").filter(Boolean),
    };
  });

  const stylesDir = path.join(OUT_DIR, "styles");
  await ensureDir(stylesDir);

  async function fetchCssWithRetries(url: string): Promise<string | null> {
    // 1) Playwright request.get with retries
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const res = await page.request.get(url, {
          headers: {
            accept: "text/css,*/*;q=0.1",
            "accept-encoding": "gzip,deflate,br",
          },
        });
        if (res.ok()) {
          return await res.text();
        }
      } catch (err) {
        if (attempt === maxAttempts) {
          // fall through to page-side fetch
        } else {
          await new Promise((r) => setTimeout(r, 250 * attempt));
        }
      }
    }
    // 2) Fallback: page-side window.fetch to bypass Node-side TLS/proxy hiccups
    try {
      const text = await page.evaluate(async (u) => {
        try {
          const res = await fetch(u, {
            headers: { accept: "text/css,*/*;q=0.1" },
          });
          if (!res.ok) return null;
          return await res.text();
        } catch (e) {
          return null;
        }
      }, url);
      return text;
    } catch (e) {
      return null;
    }
  }

  for (let i = 0; i < hrefs.length; i++) {
    const url = hrefs[i];
    const css = await fetchCssWithRetries(url);
    if (css !== null) {
      await fs.writeFile(path.join(stylesDir, `link_${i}.css`), css, "utf8");
    } else {
      console.warn("CSS fetch failed permanently:", url);
      await fs.writeFile(
        path.join(stylesDir, `link_${i}.failed.txt`),
        url,
        "utf8"
      );
    }
  }

  for (let i = 0; i < inlineStyles.length; i++) {
    await fs.writeFile(
      path.join(stylesDir, `inline_${i}.css`),
      inlineStyles[i],
      "utf8"
    );
  }

  await ensureDir(path.join(OUT_DIR, "screenshots"));
  await page.screenshot({
    path: path.join(OUT_DIR, "screenshots", "baseline.png"),
    fullPage: true,
  });

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
