# Learning Playwright Fundamentals

A project for learning end-to-end testing with [Playwright](https://playwright.dev). The specs live under `tests/` in three numbered learning tracks — basics, test annotations, and locator commands — built against the Playwright docs site, the Testing Academy practice app, and a few other demo sites. A few standalone scripts also exercise the raw Playwright API (`browser` → `context` → `page`) outside the test runner.

## Prerequisites

- [Node.js](https://nodejs.org) (16 or newer, LTS recommended — the standalone scripts are run through `tsx`, which `npx` fetches on demand)
- npm (comes with Node.js)

## Installation

If you cloned this repo, install the existing dependencies:

```bash
npm install
```

Then install the browser binaries needed to run tests:

```bash
npx playwright install
```

To install browsers for a specific browser only, pass its name:

```bash
npx playwright install chromium
```

If you ever need to scaffold a fresh Playwright project from scratch, the interactive starter does all of the above for you:

```bash
npm init playwright@latest
```

## Project structure

```text
.
├── playwright.config.ts                    # test runner configuration
├── package.json                            # dependencies
├── tests/
│   ├── 01_Basics/
│   │   ├── 01_01_example.spec.ts           # title assertions against playwright.dev
│   │   ├── 01_02_tta-check.spec.ts         # codegen-recorded login flow (Testing Academy app)
│   │   ├── 01_03_normal_pw.ts              # standalone script: browser → context → page
│   │   ├── 01_04_multiple_context.ts       # standalone script: two isolated contexts
│   │   ├── 01_05_BCP.spec.ts               # standalone script: annotated BCP walkthrough
│   │   ├── 01_06_TA.spec.ts                # multi-context tests using the `browser` fixture
│   │   └── 01_07_Test_Options.spec.ts      # context options (viewport, locale, geolocation, …)
│   ├── 02_TestAnnotations/
│   │   ├── 02_01_TestAnnotations.spec.ts   # skip / only / fail / fixme / slow
│   │   └── 02_02_TestDescribe.spec.ts      # grouping tests with test.describe
│   └── 03_Locator_Commands/
│       └── 03_01_LC.spec.ts                # locator commands practice
├── Architecture/
│   └── index.html                          # architecture reference: layers, diagrams, glossary
├── playwright-report/                      # generated HTML report (gitignored)
└── test-results/                           # per-run artifacts and traces (gitignored)
```

### Playwright config

`playwright.config.ts` defines:

- **`testDir`** — where your specs live (`./tests`), scanned recursively
- **`projects`** — which browsers to run: Chromium, Firefox, and WebKit are pre-configured
- **`use`** — shared options. This project sets `headless: false`, so browsers are visible by default, and `trace: 'on-first-retry'` to capture a trace whenever a test is retried
- **`reporter`** — test output format (`html`, written to `playwright-report/`)
- **`fullyParallel` / `workers` / `retries`** — parallelism and retry behaviour (1 worker and 2 retries only on CI)

## Tests in this repo

### Specs (run by the Playwright test runner)

Files ending in `.spec.ts` are picked up automatically from anywhere under `tests/`. They are grouped into numbered learning tracks:

**`01_Basics/`** — the fundamentals:

- **`01_01_example.spec.ts`** — navigates to `https://playwright.dev/` and asserts the page title, from two independent tests (`viewer` and `admin`).
- **`01_02_tta-check.spec.ts`** — a Codegen-recorded login flow against `https://app.thetestingacademy.com/playwright/multiple_element_filter`. Fills the email and password fields with `getByRole` locators and clicks the login button with `getByTestId`.
- **`01_06_TA.spec.ts`** — one test navigates to the Testing Academy site; another takes the `browser` fixture, opens three contexts (admin, user, guest), and drives each one to a different site independently.
- **`01_07_Test_Options.spec.ts`** — creates contexts with explicit options: viewport size, locale, timezone, geolocation, and permissions. The second test builds a phone-shaped "mobile context" with a user agent, `deviceScaleFactor`, `isMobile`, and `hasTouch`.

**`02_TestAnnotations/`** — controlling what runs:

- **`02_01_TestAnnotations.spec.ts`** — demonstrates `test.skip`, `test.only`, `test.fail`, `test.fixme`, and `test.slow()`, including a conditional `test.fixme` that only applies on WebKit. Note the active `test.only` — see [Running tests](#running-tests).
- **`02_02_TestDescribe.spec.ts`** — groups tests under a `test.describe('Login Page', …)` block with a mix of normal, `fixme`, and `skip` tests. Run just that group with `npx playwright test -g "Login Page"`.

**`03_Locator_Commands/`** — locator practice:

- **`03_01_LC.spec.ts`** — currently just navigates to the multi-element filter page, ready for locator exercises.

Example of the style used:

```ts
import { test, expect } from '@playwright/test';

test('viewer', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(
    'Fast and reliable end-to-end testing for modern web apps | Playwright'
  );
});
```

### Standalone scripts (not tests)

Three files under `tests/01_Basics/` are plain scripts, not `test()` specs. They import from `playwright` (the library) rather than `@playwright/test` (the runner), so they are executed directly instead of being run as tests:

- **`01_03_normal_pw.ts`** — launches Chromium, creates a context and a page, goes to `https://example.com`, logs the page title, then closes page → context → browser in that order.
- **`01_04_multiple_context.ts`** — launches a single browser and opens two independent contexts, one for an admin user and one for a viewer, each with its own page and session. This is the pattern to reach for whenever a test needs more than one logged-in user at a time.
- **`01_05_BCP.spec.ts`** — the same browser → context → page walkthrough with comments at each level and the matching teardown. Despite the `.spec.ts` name it declares no tests, so the runner collects nothing from it; rename it to `.ts` if you would rather keep it out of collection entirely.

Run them with a TypeScript runner:

```bash
npx tsx tests/01_Basics/01_03_normal_pw.ts
npx tsx tests/01_Basics/01_04_multiple_context.ts
npx tsx tests/01_Basics/01_05_BCP.spec.ts
```

Running `node tests/01_Basics/01_03_normal_pw.ts` directly does not work here: `package.json` sets `"type": "commonjs"`, so Node treats `.ts` files as CommonJS TS and rejects the ESM `import` statements with `SyntaxError: Cannot use import statement outside a module`. A runner such as `tsx` handles the TypeScript and the module interop for you.

## Running tests

Run all tests in all configured browsers:

```bash
npx playwright test
```

> **Note** — `02_01_TestAnnotations.spec.ts` currently has an active `test.only('login as man')`. Focus mode is run-wide, so while that line is there a full run executes only that one test (once per browser project) and everything else is skipped. Remove or comment out the `.only` to run the whole suite.

Run a single test file or a whole track:

```bash
npx playwright test tests/01_Basics/01_01_example.spec.ts
npx playwright test tests/03_Locator_Commands
```

Each spec runs once per browser project, so the collected set is the same tests three times over — `npx playwright test --list` currently reports 54 tests. To see what would run without launching a browser:

```bash
npx playwright test --list
```

Run only one browser, or force the browser to stay hidden:

```bash
npx playwright test --project=chromium
npx playwright test --headless
```

`--headed` is already the default behaviour here because of `headless: false` in the config, so there is no need to pass it.

Show the HTML report after a run:

```bash
npx playwright show-report
```

## Generating tests with Codegen

Codegen records your interactions in a browser and generates a Playwright test (and/or locators) automatically.

Start codegen for a URL:

```bash
npx playwright codegen https://app.thetestingacademy.com
```

Codegen opens two windows:

1. **The browser** — click, type, and navigate as you normally would
2. **The inspector** — shows the generated test code live and lets you copy it

Useful Codegen commands:

```bash
# Record a test and save it directly to a file
npx playwright codegen --target=playwright-test -o tests/demo.spec.ts https://example.com

# Generate a locator for a single element instead of a full test
npx playwright codegen --target=python https://example.com

# Open codegen with a specific browser
npx playwright codegen --browser=firefox https://example.com
```

Playwright picks the **best locator** for each element you interact with — prefer `getByRole`, `getByLabel`, and `getByTestId` over brittle CSS/XPath selectors, then make small edits to the generated code (fill in data, add assertions) before committing it.

## Running tests in CI

Playwright works out of the box with GitHub Actions/CI. The simplest workflow:

```yaml
uses: actions/checkout@v4
uses: actions/setup-node@v4
run: npm ci
run: npx playwright install --with-deps
run: npx playwright test
```

Note that `headless: false` in the config means CI needs a virtual display, or you should override it with `npx playwright test --headless` in the workflow. Also keep in mind that `forbidOnly` is enabled on CI, so a committed `test.only` will fail the build there.

## Architecture reference

`Architecture/index.html` is a self-contained reference page on how Playwright works internally — the three layers (client library, driver, browser engines), the protocols (CDP, Juggler, WebKit), the runner/worker model, the browser → context → page hierarchy, auto-waiting, locators, and a glossary. Open it directly in a browser:

```bash
start Architecture/index.html      # Windows
open Architecture/index.html       # macOS
```

It has no external dependencies, so it works offline, and every diagram is inline SVG.

## Learn more

- [Playwright docs](https://playwright.dev/docs/intro)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [Locators](https://playwright.dev/docs/locators)
- [Browser contexts](https://playwright.dev/docs/browser-contexts)
