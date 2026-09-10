# Learning Playwright Fundamentals

A project for learning end-to-end testing with [Playwright](https://playwright.dev). It contains example specs built against the Playwright docs site and the Testing Academy practice app, plus a couple of standalone scripts that exercise the raw Playwright API (`browser` → `context` → `page`).

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
├── playwright.config.ts       # test runner configuration
├── package.json               # dependencies
├── tests/
│   ├── example.spec.ts        # title assertions against playwright.dev
│   ├── tta-check.spec.ts      # codegen-recorded login flow (Testing Academy app)
│   ├── normal_pw.ts           # standalone script: launch browser, open a page
│   └── multiple_context.ts    # standalone script: two isolated contexts
├── playwright-report/         # generated HTML report (gitignored)
└── test-results/              # per-run artifacts and traces (gitignored)
```

### Playwright config

`playwright.config.ts` defines:

- **`testDir`** — where your specs live (`./tests`)
- **`projects`** — which browsers to run: Chromium, Firefox, and WebKit are pre-configured
- **`use`** — shared options. This project sets `headless: false`, so browsers are visible by default, and `trace: 'on-first-retry'` to capture a trace whenever a test is retried
- **`reporter`** — test output format (`html`, written to `playwright-report/`)
- **`fullyParallel` / `workers` / `retries`** — parallelism and retry behaviour (1 worker and 2 retries only on CI)

## Tests in this repo

### Specs (run by the Playwright test runner)

Files ending in `.spec.ts` are picked up automatically:

- **`tests/example.spec.ts`** — navigates to `https://playwright.dev/` and asserts the page title. Currently runs the same check from a `viewer` and an `admin` test as a first look at independent test cases.
- **`tests/tta-check.spec.ts`** — a Codegen-recorded login flow against `https://app.thetestingacademy.com/playwright/multiple_element_filter`. Fills the email and password fields with `getByRole` locators and clicks the login button with `getByTestId`.

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

### Standalone scripts (not run by the test runner)

`tests/normal_pw.ts` and `tests/multiple_context.ts` are plain scripts, not `test()` specs, and they import from `playwright` rather than `@playwright/test` — so `npx playwright test` ignores them. Run them with a TypeScript runner instead:

```bash
npx tsx tests/normal_pw.ts
npx tsx tests/multiple_context.ts
```

Running `node tests/normal_pw.ts` directly does not work here: `package.json` sets `"type": "commonjs"`, so Node treats `.ts` files as CommonJS TS and rejects the ESM `import` statements with `SyntaxError: Cannot use import statement outside a module`. A runner such as `tsx` handles the TypeScript and the module interop for you.

- **`normal_pw.ts`** — launches Chromium, creates a context and a page, goes to `https://example.com`, logs the page title, then closes page → context → browser in that order.
- **`multiple_context.ts`** — launches a single browser and opens two independent contexts, one for an admin user and one for a viewer, each with its own page and session. This is the pattern to reach for whenever a test needs more than one logged-in user at a time.

## Running tests

Run all tests in all configured browsers:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/example.spec.ts
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

Note that `headless: false` in the config means CI needs a virtual display, or you should override it with `npx playwright test --headless` in the workflow.

## Learn more

- [Playwright docs](https://playwright.dev/docs/intro)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [Locators](https://playwright.dev/docs/locators)
- [Browser contexts](https://playwright.dev/docs/browser-contexts)
