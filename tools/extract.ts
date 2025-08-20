import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'

const TARGET_URL = 'https://m.albamon.com/jobs/search/detail-conditions'
const OUT_DIR = path.resolve('extracted')

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true })
}

async function main() {
  await ensureDir(OUT_DIR)
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
    deviceScaleFactor: 2,
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  })

  await context.addInitScript(() => {
    const fixed = new Date('2024-01-01T09:00:00+09:00').valueOf()
    // @ts-ignore
    const _Date = Date
    // @ts-ignore
    class FixedDate extends _Date {
      constructor(...args: any[]) {
        super()
        if (args.length === 0) return new _Date(fixed)
        // @ts-ignore
        return new _Date(...(args as any))
      }
      static now() {
        return fixed
      }
    }
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    Date = FixedDate as any
    Math.random = () => 0.123456789
    const style = document.createElement('style')
    style.textContent = '*{animation:none!important;transition:none!important}'
    document.documentElement.appendChild(style)
  })

  const page = await context.newPage()
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' })

  const html = await page.content()
  await fs.writeFile(path.join(OUT_DIR, 'index.html'), html, 'utf8')

  const { hrefs, inlineStyles } = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    const styles = Array.from(document.querySelectorAll('style'))
    return {
      hrefs: links.map((l) => (l as HTMLLinkElement).href).filter(Boolean),
      inlineStyles: styles.map((s) => s.textContent || '').filter(Boolean),
    }
  })

  const stylesDir = path.join(OUT_DIR, 'styles')
  await ensureDir(stylesDir)

  for (let i = 0; i < hrefs.length; i++) {
    const url = hrefs[i]
    try {
      const res = await page.request.get(url)
      const css = await res.text()
      await fs.writeFile(path.join(stylesDir, `link_${i}.css`), css, 'utf8')
    } catch (e) {
      console.warn('CSS fetch failed:', url, e)
    }
  }

  for (let i = 0; i < inlineStyles.length; i++) {
    await fs.writeFile(path.join(stylesDir, `inline_${i}.css`), inlineStyles[i], 'utf8')
  }

  await ensureDir(path.join(OUT_DIR, 'screenshots'))
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshots', 'baseline.png'), fullPage: true })

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


