## 알바몬 모바일 상세 조건 페이지 픽셀-퍼펙트 클론 계획서

원본: [m.albamon.com/jobs/search/detail-conditions](https://m.albamon.com/jobs/search/detail-conditions)

### 목표

- **100% 픽셀 단위 일치**: 동일 뷰포트, 동일 DPR, 동일 폰트, 동일 렌더링 조건에서 스크린샷 비교 시 픽셀 차이 0% 또는 허용 오차 0.1% 이하.
- **CSR 환경 충실 재현**: 원본이 CSR이므로 Headless Browser에서 렌더링-후 상태의 HTML/CSS를 추출해 기준으로 삼음.
- **Vite + React + CSS Modules**로 구현: 컴포넌트 단위 분해 및 스타일 캡슐화.

### 기준 환경(픽셀-퍼펙트 베이스라인)

- **브라우저**: Chromium (Playwright 제공 빌드)
- **뷰포트**: width 1512px × height 982px
- **Device Pixel Ratio(DPR)**: 2
- **OS/Locale/Timezone**: ko-KR, Asia/Seoul
- **폰트**: 원본 페이지가 로드하는 웹 폰트/시스템 폰트 그대로 사용. 추출 단계에서 폰트 패밀리 및 URL을 수집하여 프로젝트에 포함.
- **애니메이션/트랜지션**: 비활성화(스크린샷 비교 안정화)
- **랜덤/시간 의존성**: `Date`, `Math.random` 고정, 네트워크 요청 캐시 고정화

### 사용 기술

- **런타임/툴링**: Node 20+, pnpm(or npm)
- **프론트엔드**: Vite + React (TypeScript), CSS Modules
- **Headless**: Playwright (Chromium)
- **정적 분석/후처리(옵션)**: PostCSS, csstree, SVGO
- **시각 회귀 테스트**: Playwright screenshot + pixelmatch(또는 @playwright/test의 snapshot 비교)

### 산출물

- `extracted/` 디렉토리: 원본에서 추출한 HTML, CSS, 폰트, 이미지(필요 시)
- `src/` 디렉토리: React 컴포넌트/페이지 구조 및 CSS Modules
- `visual-diff/` 디렉토리: 스크린샷 및 diff 결과(자동 비교 리포트)
- 본 문서(`docs/plan.md`): 진행 중 업데이트 반영

---

## 작업 절차

### 1) 프로젝트 스캐폴딩 (Vite + React + CSS Modules)

- TypeScript 포함 권장.
- 디렉토리 설계(최신):
  - `src/pages/DetailConditions/`
    - `DetailConditionsPage.tsx` (조합만 담당)
    - `components/`
      - `Header.tsx`, `Header.module.css`
      - `Section.tsx`, `Section.module.css`
      - `AddButton.tsx`, `AddButton.module.css`
      - `Chips.tsx`, `Chips.module.css`
      - `Toggle.tsx`, `Toggle.module.css`
      - `Checkbox.tsx`, `Checkbox.module.css`
      - `Select.tsx`, `Select.module.css`
      - `Footer.tsx`, `Footer.module.css`
      - `Layout.tsx`, `Layout.module.css` (container/description/mainContent)
    - `sections/`
      - `WorkAreaSection.tsx`
      - `JobTypeSection.tsx`
      - `WorkPeriodSection.tsx`
      - `WorkDaySection.tsx`
      - `WorkTimeSection.tsx`
      - `GenderSection.tsx`
      - `AgeSection.tsx`, `AgeSection.module.css`
      - `EmploymentTypeSection.tsx`
      - `KeywordSection.tsx`, `KeywordSection.module.css`
  - `src/styles/variables.module.css` (색상/타이포/간격 토큰)
  - `src/assets/` (SVG/폰트)

메모:

- 페이지 전역 CSS `DetailConditionsPage.module.css`는 삭제됨. 모든 스타일은 컴포넌트/섹션 단위의 CSS Module로 분리됨.

설치 예시(참고):

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm add -D @types/node postcss autoprefixer
pnpm add classnames
```

Vite 설정은 CSS Modules 기본 사용(파일명 `*.module.css`) 기준. 전역 리셋은 최소화하고, 원본의 기본 스타일 흐름을 우선.

### 2) Headless Browser로 원본 렌더링 및 HTML/CSS 추출

- Playwright로 대상 URL을 로드하고, 네트워크 idle 후 상태에서 다음을 수행:
  - DOM 스냅샷(SSR이 아닌 CSR 완료 시점)
  - CSS 리소스 수집: `<link rel="stylesheet">`의 href 및 `<style>`의 텍스트
  - 폰트/이미지 리소스 URL 수집 및 다운로드(필요 시)
  - 애니메이션/트랜지션 비활성화, 시간/난수 고정, UA/뷰포트/DPR 고정

추출 스크립트(초안): `tools/extract.ts`

```ts
import { chromium, devices } from "playwright";
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

  // 안정화: 시간/난수/애니메이션 고정
  await context.addInitScript(() => {
    // 고정 시간
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

    // 난수 고정
    Math.random = () => 0.123456789;

    // 애니메이션/전환 제거
    const style = document.createElement("style");
    style.textContent = "*{animation:none!important;transition:none!important}";
    document.documentElement.appendChild(style);
  });

  const page = await context.newPage();
  await page.goto(TARGET_URL, { waitUntil: "networkidle" });

  // DOM 스냅샷
  const html = await page.content();
  await fs.writeFile(path.join(OUT_DIR, "index.html"), html, "utf8");

  // 스타일시트/스타일 태그 수집
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

  // 외부 CSS 다운로드
  for (let i = 0; i < hrefs.length; i++) {
    const url = hrefs[i];
    try {
      const res = await page.request.get(url);
      const css = await res.text();
      await fs.writeFile(path.join(stylesDir, `link_${i}.css`), css, "utf8");
    } catch (e) {
      console.warn("CSS fetch failed:", url, e);
    }
  }

  // 인라인 CSS 저장
  for (let i = 0; i < inlineStyles.length; i++) {
    await fs.writeFile(
      path.join(stylesDir, `inline_${i}.css`),
      inlineStyles[i],
      "utf8"
    );
  }

  // 스크린샷(비교 기준)
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
```

실행 예시:

```bash
pnpm add -D playwright
npx playwright install chromium --with-deps
ts-node tools/extract.ts
```

출력물: `extracted/index.html`, `extracted/styles/*.css`, `extracted/screenshots/baseline.png`

### 3) 추출물 정밀 분석 및 문서화

- HTML 구조를 섹션 단위로 분해하여 컴포넌트 맵 작성
  - 상단 헤더/뒤로가기/제목/닫기
  - 필터 바(정렬, 마감임박, 거리 등)
  - 조건 칩 그룹(선택/해제 상태)
  - 바텀시트(직군/지역/기간 등)
  - 공고 카드 리스트(썸네일, 기업명, 시급/근무형태, 라벨, 거리 등)
  - 플로팅/스티키 영역(선택 적용, 초기화)
- CSS 토큰(색상, 폰트 크기/가중치, 라운딩, 그림자, 간격) 도출 후 `variables.module.css`로 정리
- 폰트/아이콘 수집: `<link rel="preload" as="font">`, `<link rel="stylesheet">` 내부 `@font-face`, `<svg>`/`<img>` 추적
- 인터랙션 상태 정의: hover(모바일은 press), active, focus-visible, selected, disabled 등

문서화 항목(이 파일 내 업데이트):

- 레이아웃 그리드/여백 규칙
- 타이포 스케일과 줄간격
- 아이콘 크기/터치 타겟(최소 44px 권장)
- 칩/버튼/바텀시트의 상태 전이와 높이
- 리스트 셀의 최소 높이와 줄 수 제한(line-clamp)

#### 3.1) 1차 추출 결과 요약(데스크톱 기준 1512×982 @2x)

- 폰트
  - 기본: Pretendard Variable (가변, `font-weight: 45 920`, `font-display: swap`)
    - 서브셋 woff2 사용 경로 예시: `https://mc.albamon.kr/etc/msa/assets/webfonts/subset/PretendardVariable.subset.*.woff2`
  - 아이콘 폰트: `icons`(`icons_v1.8.7.woff`), 일부 화면에서 FontAwesome v4.7.0 사용 흔적
- 색상(발견된 주요 값)
  - 프라이머리: `#ff501b`
  - 배경 라이트: `#f8f8f8`
  - 본문/보조: `#6a6a6a`, `#9e9e9e`
  - 경계선: `#e8e8e8`, `#d2d2d2`
- 간격/라운딩(패턴)
  - 패딩/마진: 8, 12, 16, 20, 24, 32px 빈도 높음
  - 라운딩: 4px, 8px
  - 라인-헤이트: 140% 사용 예시
  - 레터-스페이싱: `-0.75px` 사용 예시(설명/서브텍스트)
- 레이아웃/컴포넌트 힌트
  - DetailConditions 헤더: 패딩 `24px 20px`, 배경 `#f8f8f8`, 본문 `#6a6a6a`
  - Tabs: 버튼 영역 보더 `1px solid #e8e8e8`, 스크롤형 버튼 내 패딩/간격 수치 존재(11px/4px 등)
  - Toggle: 기본 높이 32px, 라지 48px, 탭 버튼 변형 44px, 스몰 원형 34px 등 변형별 고정 높이
  - ApplyInfo/TitleForm/Complete 등의 템플릿 스타일에서 토큰 일관성 재확인(프라이머리 하이라이트, 경계선, 간격)
- Next.js 정적 CSS 링크 확인
  - `/_next/static/css/*.css` 다수. 모두 수집 대상으로 처리(한 파일은 일시 실패 가능성 있어 재시도 처리).

액션 아이템

- Pretendard Variable 및 아이콘 웹폰트 로컬 캐시/서빙 옵션 준비
- CSS 토큰화에 위 색상/간격/라운딩 반영
- Toggle/Tabs/헤더 등 고정 높이/간격 수치화를 컴포넌트 설계에 반영

### 4) 클론 UI 구현 (React + CSS Modules)

- 컴포넌트 분해 원칙: 원본 DOM 구조를 우선 존중. 의미 단위로만 최소한의 래핑.
- CSS Modules 네이밍: 컴포넌트 단위 로컬 스코프(파일명 `*.module.css`) 유지. 필요 시 BEM 유사 네이밍을 보조적으로 사용.
- 전역 스타일 회피: reset 최소화, 필요한 유틸(스크린리더 텍스트 등)만 전역 제공
- 이미지/아이콘: 가능하면 SVG로 추출하여 1:1 치수 매칭
- 폰트 로딩: `@font-face`를 추출 그대로 복제, FOUT 방지 옵션 확인

#### 4.1) 구현 현황

- 레이아웃/헤더/푸터/토글/칩/체크박스/셀렉트/키워드 입력/고용형태 섹션까지 컴포넌트화 완료
- 섹션 간 여백, 헤더 패딩(좌우 12px), 푸터 패딩(8px), 체크박스 상태(비활성/선택) 등 원본 수치 반영
- 아이콘은 원본의 `<i>`+`::before` 전략을 재현. `.icon-line_check::before { color: inherit }`로 상태 기반 색상 상속 처리

#### 4.2) 리팩토링 원칙(적용됨)

- God Component 제거 → 페이지는 조합만 담당
- UI 단위 모듈화 + 인접 CSS Module 배치(컴포넌트와 같은 폴더)
- 중복 스타일 제거, 상태별 스타일은 해당 컴포넌트 모듈로 귀속

### 5) 픽셀-퍼펙트 시각 회귀 테스트

- Playwright 테스트에서 동일 뷰포트/DPR로 렌더링 후 스크린샷
- `baseline.png`와 비교, 허용 오차 0.1% 이하 목표(초기에는 0% 지향)

현황:

- 개발 서버에서 수치 교정(섹션 패딩 20px, 헤더 좌우 12px, 푸터 8px, 체크박스 24px 원형 등) 후 수동 검증 완료
- 테스트 스크립트는 추후 재도입 계획(삭제된 테스트 복구 예정)
- 차이 발생 시 규칙:
  1. 폰트 서브픽셀 렌더링/힌팅 → 시스템 폰트/가중치/안티앨리어싱 확인
  2. 라인-헤이트, 레터-스페이싱, 자간/커닝 → CSS 수치 강제 지정
  3. 아이콘 렌더 차이 → 동일 뷰박스/정수 좌표 스냅
  4. 색상/투명도 오차 → 원본 CSS 토큰 재검증

테스트 스니펫(초안): `tests/visual.spec.ts`

```ts
import { test, expect, chromium } from "@playwright/test";

test("DetailConditions pixel-perfect", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
    deviceScaleFactor: 2,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
  });
  const page = await context.newPage();
  await page.goto("http://localhost:5173");
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot("baseline.png", {
    maxDiffPixelRatio: 0.001,
  });
  await browser.close();
});
```

### 6) 동적 요소/데이터 처리

- 원본이 CSR로 로딩하는 광고/ABTest/실시간 데이터는 고정 스텁으로 대체
- 날짜/남은시간 UI: 고정된 `Date.now()` 기반으로 하드코딩된 예시 데이터 적용
- 네트워크 의존 상태 → 로컬 JSON/모킹으로 픽셀 형상 보장

### 7) 접근성/반응성(범위 관리)

- 본 과업 목표는 특정 뷰포트에서 100% 일치. 반응형/접근성 개선은 범위 외로 두되, 구조적 시멘틱은 유지.

---

## 컴포넌트 설계(초안)

- **Header**: 뒤로가기, 타이틀, 닫기/옵션 아이콘
- **FilterBar**: 정렬/필터 버튼, 배지 카운트
- **Chips**: 조건 토글 칩 리스트(선택/해제 상태 스타일 규칙 포함)
- **BottomSheet**: 조건 선택 시트(헤더/스크롤 영역/확인 버튼 고정)
- **JobCard**: 이미지, 기업/공고명, 라벨, 급여/형태, 거리, 태그
- **Toast**: 선택 적용/초기화 알림

각 컴포넌트의 높이, 내부 패딩, 간격, 라운딩 값은 추출 CSS와 스크린샷 기준으로 수치화.

### 4.1) 컴포넌트별 초기 수치(1차)

- Header
  - padding: 24px 20px
  - background: var(--color-surface)
  - text: var(--color-text-muted)
- Tabs
  - border-bottom: 1px solid var(--color-border)
  - buttons inner padding: 11px 4px
  - scroll margin between slides: 8px
- Toggle
  - base height: 32px
  - large height: 48px
  - tabButton variant height: 44px
  - rounded-primary-small min-width: 36px, height: 34px

---

## CSS 모듈 규칙 및 토큰 예시

`src/styles/variables.module.css`(예시):

```css
:root {
  /* 색상 (1차 추출 기반 값) */
  --color-bg: #ffffff;
  --color-surface: #f8f8f8;
  --color-fg: #111111;
  --color-text-muted: #6a6a6a;
  --color-text-secondary: #9e9e9e;
  --color-border: #e8e8e8;
  --color-border-strong: #d2d2d2;
  --color-primary: #ff501b;

  /* 타이포 */
  --font-family-base: "Pretendard Variable", system-ui, -apple-system, BlinkMacSystemFont,
    "Apple SD Gothic Neo", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-md: 14px;
  --font-size-lg: 16px;
  --line-height-tight: 1.2;
  --line-height-base: 1.4; /* 140% 근사 */
  --letter-spacing-tight: -0.75px; /* 설명/서브텍스트에 관찰됨 */

  /* 간격/라운딩 (관찰된 빈도) */
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --radius-4: 4px;
  --radius-8: 8px;
}
```

모든 수치는 실제 추출 CSS 기반으로 갱신.

---

## 아이콘/이미지 처리

- `<svg>` 인라인 요소는 추출하여 `src/assets/icons/*.svg`로 저장, React 컴포넌트로 래핑 가능
- 비트맵은 동일 해상도/치수 유지. 필요 시 `sharp`로 최적화하되 시각 결과 변화가 없어야 함
- `background-image` 사용 시 위치/크기(`background-position/size`) 1:1 매칭

---

## 검증 체크리스트

- [ ] 동일 폰트 로드(가중치/서브셋 동일), FOIT/FOUT 여부 없음
- [ ] 라인-헤이트, 레터-스페이싱 수치 일치
- [ ] 컴포넌트별 바운딩 박스 좌표/치수 일치
- [ ] 색상/그라데이션/그림자 값 일치
- [ ] 스크롤/스티키/플로팅 동작 및 경계치(오버스크롤) 일치
- [ ] 스크린샷 기반 시각 회귀(diff == 0 또는 0.1% 이하)

---

## 업무 플로우 및 스냅샷 시나리오

- 초기 로딩 상태
- 필터 칩 1개 이상 선택 상태
- 바텀시트 오픈 상태(스크롤 중간/최상단/최하단)
- 공고 카드에 라벨/태그가 다양한 조합으로 표시된 상태
- 스티키 영역(적용/초기화) 활성 상태

각 시나리오별 스크린샷 및 컴포넌트 단위 스냅샷을 수집하여 회귀 테스트 케이스로 등록.

---

## 향후 업데이트 계획

- 추출 스크립트 고도화: CSS `@import` 재귀 처리, cross-origin CSS 프록시 처리, 폰트 파일 자동 다운로드
- 토큰 자동화: 추출 CSS로부터 색상/폰트/간격 토큰 반자동 생성
- 스냅샷 리포트: HTML 리포트 생성으로 변경 Diff 탐색성 개선
- 상호작용 케이스 확대: 바텀시트 선택 플로우, 정렬 변경, 토스트 노출 등

본 문서는 계획 변경 시 수시 업데이트되며, 변경 이력은 Git 커밋 메시지로 추적합니다.
