# Learning Playwright Fundamentals

A project for learning end-to-end testing with [Playwright](https://playwright.dev). The specs live under `tests/` in numbered learning tracks — basics, test annotations, locator commands, saved-session reuse, reporting, multiple-element filtering, and web tables, plus a `DailyTask/` folder for day-to-day practice — built against the Playwright docs site, the Testing Academy and VWO practice apps, the Katalon Cura demo app, the AwesomeQA practice tables, and a few other demo sites. A few standalone scripts also exercise the raw Playwright API (`browser` → `context` → `page`) outside the test runner, and every run feeds three reporters at once: the console `line` reporter, Allure, and a custom TTA HTML reporter in `utils/`.

## Prerequisites

- [Node.js](https://nodejs.org) (16 or newer, LTS recommended — the standalone scripts are run through `tsx`, which `npx` fetches on demand)
- npm (comes with Node.js)

## Installation

If you cloned this repo, install the existing dependencies:

```bash
npm install
```

That also pulls in the reporting and config packages this project uses: `allure-playwright` and `allure-commandline` (so `npx allure …` works without a global install) and `dotenv`.

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
├── .env.example                            # template for VWO_USER / VWO_PASS (copy to .env)
├── user-session.json                       # saved login cookies used by the 04/05 tracks (gitignored)
├── template/template.spec.ts               # starter template for new specs (outside testDir)
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
│   ├── 03_Locator_Commands/
│   │   ├── 03_01_LC.spec.ts                # goto options: waitUntil, timeout, referer
│   │   ├── 03_02_Refere.spec.ts            # referer applied to a whole context
│   │   ├── 03_03_Fresh.spec.ts             # default/CSS locators on the VWO login page
│   │   ├── 03_04_Project3.spec.ts          # XPath locators + validation message (Wingify free trial)
│   │   ├── 03_05_getByRole.spec.ts         # role-based textbox locators on the VWO login page
│   │   └── 03_06_getByRole.spec.ts         # role-based link locator on the Katalon Cura app
│   ├── 04_Session_Storage/
│   │   ├── 04_01_SessionStorage.ts         # standalone script: logs in and saves user-session.json
│   │   └── 04_02_TestWingify.spec.ts       # reuses that session to open the dashboard directly
│   ├── 05_Allure_Reporting/
│   │   ├── 05_01_TestWingify.spec.ts       # same dashboard checks, run for Allure
│   │   ├── 05_02_Custom_Report_TestWingify.spec.ts        # same checks, for the custom TTA report
│   │   └── 05_03_Media_Custom_Report_TestWingify.spec.ts  # + screenshot / video / trace capture
│   ├── 06_Multiple_Element_Filter/
│   │   ├── 06_01_ME.spec.ts                # allInnerTexts + click by text on the filter page
│   │   └── 06_02_ME.spec.ts                # Locator[] from all(), logging every href
│   ├── 07_WebTables/
│   │   ├── 07_01_WebTable.spec.ts          # starter template copied in, not filled in yet
│   │   ├── 07_02_WebTable_example1.spec.ts # dynamic XPath grid walk, finds Helen Bennett
│   │   └── 07_03_WebTable_example2.spec.ts # row-by-row cell texts from the sample table
│   ├── 08_Web_Select_Frames_IFrame/        # reserved
│   └── DailyTask/
│       ├── 01_159_LoginPage.spec.ts        # Katalon Cura login, asserts the page header
│       ├── 02_179_LoginPage.spec.ts        # TTA login with bad credentials, asserts the URL
│       └── 03_259_WebTable.spec.ts         # TTA employee table: ticks Rohan.Mehta's checkbox
├── utils/
│   ├── CustomReporter.ts                   # custom TTA HTML reporter (writes tta-report/)
│   └── selfHeal.ts                         # attachment types for the reporter's Self-Heal tab
├── ai/
│   ├── agents/rcaAgent.ts                  # failure-analysis stub behind the AI Verdict tab
│   ├── agents/flakyAnalyzer.ts             # build-over-build flaky comparison
│   └── config/providers.ts                 # hasApiKey() — the LLM provider gate
├── Architecture/
│   └── index.html                          # architecture reference: layers, diagrams, glossary
├── playwright-report/                      # Playwright's own HTML report (gitignored)
├── tta-report/                             # custom reporter output + media (gitignored)
├── reports/runs/                           # per-build status snapshots (gitignored)
├── allure-results/                         # raw Allure results (gitignored)
└── test-results/                           # per-run artifacts and traces (gitignored)
```

### Playwright config

`playwright.config.ts` defines:

- **`testDir`** — where your specs live (`./tests`), scanned recursively
- **`projects`** — which browsers to run: Chromium, Firefox, and WebKit are pre-configured
- **`use`** — shared options. This project sets `headless: false`, so browsers are visible by default, and `trace: 'on-first-retry'` to capture a trace whenever a test is retried. Individual specs can override this — `05_03` turns screenshots, video, and traces on for every test it runs
- **`reporter`** — three reporters run on every run: `line` (terminal output), `allure-playwright` (writes `allure-results/`), and the custom TTA reporter in `utils/CustomReporter.ts` (writes `tta-report/`). Playwright's built-in `html` reporter is not in the list right now, so `playwright-report/` is not refreshed — add `["html"]` back to the array if you want it
- **`fullyParallel` / `workers` / `retries`** — parallelism and retry behaviour (1 worker and 2 retries only on CI)

## Tests in this repo

### Specs (run by the Playwright test runner)

Files ending in `.spec.ts` are picked up automatically from anywhere under `tests/`. They are grouped into numbered learning tracks, plus a `DailyTask/` folder for practice exercises:

**`01_Basics/`** — the fundamentals:

- **`01_01_example.spec.ts`** — navigates to `https://playwright.dev/` and asserts the page title, from two independent tests (`viewer` and `admin`).
- **`01_02_tta-check.spec.ts`** — a Codegen-recorded login flow against `https://app.thetestingacademy.com/playwright/multiple_element_filter`. Fills the email and password fields with `getByRole` locators and clicks the login button with `getByTestId`.
- **`01_06_TA.spec.ts`** — one test navigates to the Testing Academy site; another takes the `browser` fixture, opens three contexts (admin, user, guest), and drives each one to a different site independently.
- **`01_07_Test_Options.spec.ts`** — creates contexts with explicit options: viewport size, locale, timezone, geolocation, and permissions. The second test builds a phone-shaped "mobile context" with a user agent, `deviceScaleFactor`, `isMobile`, and `hasTouch`.

**`02_TestAnnotations/`** — controlling what runs:

- **`02_01_TestAnnotations.spec.ts`** — demonstrates `test.skip`, `test.only`, `test.fail`, `test.fixme`, and `test.slow()`, including a conditional `test.fixme` that only applies on WebKit. Note the active `test.only` — see [Running tests](#running-tests).
- **`02_02_TestDescribe.spec.ts`** — groups tests under a `test.describe('Login Page', …)` block with a mix of normal, `fixme`, and `skip` tests. Run just that group with `npx playwright test -g "Login Page"`.

**`03_Locator_Commands/`** — locator practice and navigation options:

- **`03_01_LC.spec.ts`** — exercises `page.goto` options: a first navigation to the multi-element filter page with `waitUntil: 'commit'`, then a second with `waitUntil: 'domcontentloaded'`, a 45-second `timeout`, and a `referer` header, keeping the returned response.
- **`03_02_Refere.spec.ts`** — sets `Referer` once through `extraHTTPHeaders` on a context created from the `browser` fixture, so every page opened in that context (VWO, then Katalon Cura) sends it — the context-wide counterpart to the per-navigation `referer` in `03_01`.
- **`03_03_Fresh.spec.ts`** — logs into `app.vwo.com` with default locators (`#login-username`, `#login-password`, `#js-login-btn`), asserts the inline error message for bad credentials, and ends with `page.pause()` to stop in the inspector — comment that line out before a full run, since it halts the test until you resume it manually.
- **`03_04_Project3.spec.ts`** — the Wingify free-trial form: fills the email field (`//input[@id='free-trial-step1-email']`) with an invalid value, ticks the two consent checkboxes by `#id` and `[data-qa=…]`, submits, and asserts the validation text *"The email address you entered is incorrect."* Also ends with `page.pause()`.
- **`03_05_getByRole.spec.ts`** — reaches for role-based locators on the VWO login page: `getByRole('textbox', { name: 'Email', exact: true })` and `getByRole('textbox', { name: 'Password' })`, fills both, and pauses in the inspector.
- **`03_06_getByRole.spec.ts`** — goes straight to the Katalon Cura appointment page and clicks the "Make Appointment" link resolved with `getByRole('link', { name: 'Make Appointment', exact: true })`. Pauses before finishing — this one is about proving the role locator finds the right element.

**`04_Session_Storage/`** — logging in once and reusing the session:

- **`04_01_SessionStorage.ts`** — a standalone script rather than a test: launches Chromium, logs into `app.vwo.com` with `VWO_USER` / `VWO_PASS` read from `.env` via `dotenv`, waits for the dashboard URL, and dumps the context's cookies and localStorage to `user-session.json`. Run it once (and again whenever the saved session expires).
- **`04_02_TestWingify.spec.ts`** — three tests that load that file with `test.use({ storageState: './user-session.json' })`, go straight to `app.wingify.com/#/dashboard?accountId=1281775`, and assert the URL still matches `/dashboard/`. No login steps anywhere in the file.

**`05_Allure_Reporting/`** — the reporting track:

- **`05_01_TestWingify.spec.ts`** — the same three session-reusing dashboard checks, kept as the plain spec whose run feeds the Allure results.
- **`05_02_Custom_Report_TestWingify.spec.ts`** — the same three checks a third time, under a name that says what to do with it: run it with `--reporter=./utils/CustomReporter.ts` and watch the TTA report fill up test by test. See [Reports](#reports).
- **`05_03_Media_Custom_Report_TestWingify.spec.ts`** — generates its three tests in a `for` loop over `[1, 2, 3]`, each written as `test.step` blocks (`open the dashboard`, `confirm we are not on the login screen`, `attach a named screenshot`). It turns on `screenshot: 'on'`, `video: 'on'`, and `trace: 'on'` for the file and attaches a full-page PNG with `testInfo.attach(...)`, so the custom reporter has media to render. It uses account `1281316` and also asserts the login username field is hidden.

**`06_Multiple_Element_Filter/`** — driving collections of elements:

- **`06_01_ME.spec.ts`** — opens the Testing Academy multi-element-filter page, collects every `a.list-group-item` into a `string[]` with `allInnerTexts()`, logs the count (13) and each text, then clicks the link whose text is `Forgotten Password` through `page.getByText(linkText).first()`. A second pass with `all()` walks the resulting elements and logs each `href`. Ends with `page.pause()`.
- **`06_02_ME.spec.ts`** — the same page, but it keeps the `Locator[]` that `.all()` returns and walks that list to log every `href` with `getAttribute()`, instead of going through `allInnerTexts()` first. Ends with `page.pause()`.

**`07_WebTables/`** — reading data out of tables:

- **`07_01_WebTable.spec.ts`** — the starter template copied into the track and left as a placeholder: title `Verify the Testcase`, the `// Code` marker untouched, `page.goto` still pointing at the multi-element-filter URL, and a trailing `page.pause()`. Its header comment records that it was generated from `template/template.spec.ts`.
- **`07_02_WebTable_example1.spec.ts`** — `https://awesomeqa.com/webtable.html`. Builds each cell's XPath at runtime from three fragments (`//table[@id='customers']/tbody/tr[` + row + `]/td[` + column + `]`), counts rows and columns with `.count()`, walks the whole grid in a nested loop, and when a cell's text includes *Helen Bennett* reads her `following-sibling::td` to print the country she is in.
- **`07_03_WebTable_example2.spec.ts`** — `https://awesomeqa.com/webtable1.html`. Locates `table[summary="Sample Table"] tbody tr`, counts the rows, and prints each row's cell texts by index with `rows.nth(i).locator('td').allInnerTexts()`. Ends with `page.pause()`.

**`DailyTask/`** — day-to-day practice exercises:

- **`01_159_LoginPage.spec.ts`** — clicks "Make Appointment" on the Katalon Cura demo app, logs in as `John Doe`, and asserts the header on the appointment page.
- **`02_179_LoginPage.spec.ts`** — logs into the Testing Academy multi-element-filter page with deliberately wrong credentials (CSS `#email` / `#password` locators, XPath for the checkbox and button) and asserts the URL it lands on includes the submitted email, password, and `remember=yes` plus the `#login-success` fragment. Pauses at the end.
- **`03_259_WebTable.spec.ts`** — opens `https://app.thetestingacademy.com/playwright/webtable` and counts the rows and columns of the table labelled *Employee Management System table*, building the XPath from the same three fragments as `07_02`. Those counts then drive a nested loop that generates each cell's path, reads it with `innerText()`, and logs every cell; when a cell contains *Rohan.Mehta* it clicks that row's checkbox via `preceding-sibling::td`. Ends with `page.pause()` so you can see the tick land.

New specs start from `template/template.spec.ts` at the repo root — a date comment, the `@playwright/test` import, a `test()` whose title is there to replace, `page.goto`, a `// Code` marker, and a trailing `page.pause()`. It sits outside `testDir`, so the runner never collects it; copy it into the relevant numbered track and fill in the title, URL, and steps.

Folder `08_Web_Select_Frames_IFrame/` is still an empty placeholder for an upcoming track. Git does not store empty directories, so that folder will not show up after a clone until a file lands in it.

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

Four files are plain scripts, not `test()` specs: three under `tests/01_Basics/` and one under `tests/04_Session_Storage/`. They import from `playwright` (the library) rather than `@playwright/test` (the runner), so they are executed directly instead of being run as tests:

- **`01_03_normal_pw.ts`** — launches Chromium, creates a context and a page, goes to `https://example.com`, logs the page title, then closes page → context → browser in that order.
- **`01_04_multiple_context.ts`** — launches a single browser and opens two independent contexts, one for an admin user and one for a viewer, each with its own page and session. This is the pattern to reach for whenever a test needs more than one logged-in user at a time.
- **`01_05_BCP.spec.ts`** — the same browser → context → page walkthrough with comments at each level and the matching teardown. Despite the `.spec.ts` name it declares no tests, so the runner collects nothing from it; rename it to `.ts` if you would rather keep it out of collection entirely.
- **`04_01_SessionStorage.ts`** — the session saver described above; it reads credentials from `.env` and writes `user-session.json` for the 04 and 05 tracks.

Run them with a TypeScript runner:

```bash
npx tsx tests/01_Basics/01_03_normal_pw.ts
npx tsx tests/01_Basics/01_04_multiple_context.ts
npx tsx tests/01_Basics/01_05_BCP.spec.ts
npx tsx tests/04_Session_Storage/04_01_SessionStorage.ts
```

Running `node tests/01_Basics/01_03_normal_pw.ts` directly does not work here: `package.json` sets `"type": "commonjs"`, so Node treats `.ts` files as CommonJS TS and rejects the ESM `import` statements with `SyntaxError: Cannot use import statement outside a module`. A runner such as `tsx` handles the TypeScript and the module interop for you.

## Environment variables

`.env.example` holds the template for the credentials the session script needs:

```text
VWO_USER=
VWO_PASS=
```

Copy it to `.env` and fill in your own account:

```bash
cp .env.example .env       # Windows: copy .env.example .env
```

`.env` is read by `dotenv` in `04_01_SessionStorage.ts`, and it is gitignored — only the empty template is committed. Never hardcode credentials in a spec, since this repo is public.

## Saved login sessions

`tests/04_Session_Storage/04_01_SessionStorage.ts` logs into `app.vwo.com` with the `.env` credentials and writes the browser state — cookies plus localStorage — to `user-session.json` in the repo root. The 04 and 05 specs then pick it up with:

```ts
test.use({ storageState: './user-session.json' });
```

so their tests start already authenticated and go straight to the dashboard. Note the relative path: the script and the specs both expect to run from the repo root. `user-session.json` contains live auth cookies, so it is gitignored and never committed, and it expires after a while — once it does, the app bounces the browser back to `#/login` and every `toHaveURL(/dashboard/)` assertion fails. Re-run `04_01` to mint a fresh one.

## Reports

Every run writes to three places at once, one per reporter:

### Allure

`allure-playwright` collects raw results into `allure-results/` while the tests run. Render them with the bundled Allure CLI (installed as a dependency, so there is nothing to install globally):

```bash
npx allure generate allure-results --clean -o allure-report   # static HTML site into allure-report/
npx allure serve allure-results                               # or serve the results straight away
```

### Custom TTA reporter

`utils/CustomReporter.ts` is a self-contained HTML reporter for the run. It writes:

- **`tta-report/report_<YYYYMMDD_HHMMSS>.html`** — one report per run, rewritten after every test; the live copy carries a 5-second meta refresh, so you can leave it open in a browser and watch results appear
- **`tta-report/index.html`** — redirects to the newest report
- **`tta-report/history.html`** — every report kept in the folder, newest first
- **`tta-report/screenshots/`, `tta-report/videos/`, `tta-report/traces/`** — media copied out of the Playwright attachments
- **`reports/runs/run-<run-id>.json`** — this build's per-test statuses, used to diff against the previous build

It prints a running summary to the terminal too (each test as it starts and finishes, then a final pass-rate box). The report itself has five tabs: **Test Results** (filterable table of suites/tests with expandable detail — logs, steps, errors, screenshots, video, trace), **AI Data**, **AI Verdict**, **Flaky** (populated once two builds have been recorded), and **Self-Heal**. The AI-facing pieces live under `ai/`: `ai/config/providers.ts` is the provider gate and returns `false` from `hasApiKey()` here, so no failure analysis runs and the two AI tabs stay empty, while the flaky comparison still works because `ai/agents/flakyAnalyzer.ts` computes it locally.

The reporter is already in `playwright.config.ts`, so a normal run produces it. To use it on its own for a single file:

```bash
npx playwright test tests/05_Allure_Reporting/05_02_Custom_Report_TestWingify.spec.ts --reporter=./utils/CustomReporter.ts
```

`05_02` is the spec written for this report. If you want media in the report, run `05_03` instead — it captures screenshots, video, and traces for every test.

## Running tests

Run all tests in all configured browsers:

```bash
npx playwright test
```

> **Note** — `02_01_TestAnnotations.spec.ts` currently has an active `test.only('login as man')`. Focus mode is run-wide, so while that line is there a full run executes only that one test (once per browser project) and everything else is skipped. Remove or comment out the `.only` to run the whole suite.

> **Note** — ten specs call `page.pause()` at the end, which opens the Inspector and waits for you to resume: `03_03_Fresh.spec.ts`, `03_04_Project3.spec.ts`, `03_05_getByRole.spec.ts`, `03_06_getByRole.spec.ts`, `06_01_ME.spec.ts`, `06_02_ME.spec.ts`, `07_01_WebTable.spec.ts`, `07_03_WebTable_example2.spec.ts`, `DailyTask/02_179_LoginPage.spec.ts`, and `DailyTask/03_259_WebTable.spec.ts`. A full run stops at each one, so comment those lines out (or run the specific file you are working on) when you want a clean pass.

> **Note** — the 04 and 05 specs depend on `user-session.json`, which does not exist until you run `04_01_SessionStorage.ts`. Without it they load an empty state, land on the login page, and fail their URL assertions.

Run a single test file or a whole track:

```bash
npx playwright test tests/01_Basics/01_01_example.spec.ts
npx playwright test tests/03_Locator_Commands
```

Each spec runs once per browser project, so the collected set is the same tests three times over — `npx playwright test --list` currently reports 129 tests across 24 spec files. To see what would run without launching a browser:

```bash
npx playwright test --list
```

Run only one browser, or force the browser to stay hidden:

```bash
npx playwright test --project=chromium
npx playwright test --headless
```

`--headed` is already the default behaviour here because of `headless: false` in the config, so there is no need to pass it.

A useful trick while learning an unfamiliar site: start with `npx playwright test --debug` to step through a spec, or add `await page.pause()` to drop into the Inspector mid-test.

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

CI also needs `user-session.json` for the 04 and 05 tracks — either restore it from a secret/artifact, or run `npx tsx tests/04_Session_Storage/04_01_SessionStorage.ts` with `VWO_USER` / `VWO_PASS` set as environment variables before the test step. Upload `allure-results/` or `tta-report/` as build artifacts if you want the reports from a pipeline run.

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
- [Authentication / storageState](https://playwright.dev/docs/auth)
- [Allure report for Playwright](https://allurereport.org/docs/playwright/)
