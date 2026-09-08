# Learning Playwright Fundamentals

A project for learning end-to-end testing with [Playwright](https://playwright.dev). Contains example tests built against the Testing Academy practice app and the Playwright docs site.

## Prerequisites

- [Node.js](https://nodejs.org) (16 or newer, LTS recommended)
- npm (comes with Node.js)

## Installation

Install the `@playwright/test` package as a dev dependency:

```bash
npm init playwright@latest
```

This interactive command scaffolds a new Playwright project (it creates `playwright.config.ts`, a `tests/` folder, an example spec, and adds `@playwright/test` to `package.json`).

If you cloned this repo, just install the existing dependencies:

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

## Setup the basic project

The project layout looks like this:

```text
.
├── playwright.config.ts  # test runner configuration
├── package.json          # dependencies and scripts
├── tests/                # your test files (*.spec.ts)
└── test-results/         # generated test artifacts (gitignored)
```

### Playwright config

`playwright.config.ts` defines:

- **`testDir`** — where your specs live (default `./tests`)
- **`projects`** — which browsers to run: Chromium, Firefox, and WebKit are pre-configured
- **`use`** — shared options, e.g. `headless: false` to watch tests run, `trace: 'on-first-retry'` to capture traces on failures
- **`reporter`** — test output format (`html` by default)

## Running tests

Run all tests in all configured browsers:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/example.spec.ts
```

Run tests headed (watch the browser) or with only one browser:

```bash
npx playwright test --headed
npx playwright test --project=chromium
```

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

## Learn more

- [Playwright docs](https://playwright.dev/docs/intro)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [Locators](https://playwright.dev/docs/locators)