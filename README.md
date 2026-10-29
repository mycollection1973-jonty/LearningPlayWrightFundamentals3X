# Learning Playwright Fundamentals

A project for learning end-to-end testing with [Playwright](https://playwright.dev). The specs live under `tests/` in numbered learning tracks — basics, test annotations, locator commands, saved-session reuse, reporting, multiple-element filtering, web tables, dropdown select boxes, frames/iframes, keyboard/hover/drag-and-drop, JavaScript alerts, SVG and map interactions, shadow DOM, file upload/download, scrolling, expect assertions, test hooks, data-driven testing over JSON, CSV, Excel, YAML, MySQL and faker-generated data, the page object model, calendar and date pickers, and multiple-tab/window handling, plus a `DailyTask/` folder for day-to-day practice and a `Practice_code/` folder for ad-hoc exercises — built against the Playwright docs site, the Testing Academy and VWO practice apps, the Katalon Cura demo app, the AwesomeQA practice tables, SelectorsHub's iframe scenario and XPath-practice pages, the-internet's dropdown, drag-and-drop, JS-alert and upload pages, keycode.info, SpiceJet, the Applitools demo bank, the OrangeHRM demo and its open-source site, Flipkart, ESPNcricinfo, testautomationpractice.blogspot.com, PatternFly's multi-file-upload component, SimpleMaps' India SVG map, and a few other demo sites. A few standalone scripts also exercise the raw Playwright API (`browser` → `context` → `page`) outside the test runner, and every run feeds three reporters at once: the console `line` reporter, Allure, and a custom TTA HTML reporter in `utils/`.

## Prerequisites

- [Node.js](https://nodejs.org) (16 or newer, LTS recommended — the standalone scripts are run through `tsx`, which is installed as a devDependency)
- npm (comes with Node.js)

## Installation

If you cloned this repo, install the existing dependencies:

```bash
npm install
```

That also pulls in the reporting and config packages this project uses: `allure-playwright` and `allure-commandline` (so `npx allure …` works without a global install), `dotenv`, the data-driven track's readers — `exceljs`, `mysql2`, `js-yaml` with `@types/js-yaml`, and `@faker-js/faker` — plus `tsx` and `typescript`: `tsx` runs the standalone scripts and `npx tsc --noEmit` typechecks the whole repo against the root `tsconfig.json`. (`package.json` also lists a `path` package; nothing imports it — the specs use Node's built-in `path` module.)

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
├── tsconfig.json                           # strict root TS config for `npx tsc --noEmit`
├── .env.example                            # template for VWO_USER / VWO_PASS and MYSQL_* (copy to .env)
├── user-session.json                       # saved login cookies used by the 04/05 tracks (gitignored)
├── template/template.spec.ts               # starter template for new specs (outside testDir)
├── testdata/                               # shared upload fixtures used by 14_06 (sample.pdf / .jpg / .docx)
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
│   │   ├── 07_01_WebTable.spec.ts           # starter template copied in, not filled in yet
│   │   ├── 07_02_WebTable_example1.spec.ts  # dynamic XPath grid walk, finds Helen Bennett
│   │   ├── 07_03_WebTable_example2.spec.ts  # row-by-row cell texts from the sample table
│   │   ├── 07_04_WebTable_example3.spec.ts  # filter({ hasText }) on a link and a footer link
│   │   ├── 07_05_WebTable_example4.spec.ts  # :has(td:text(…)) row locator, ticks the checkbox
│   │   ├── 07_06_WT_Pagination.spec.ts      # Next-clicks until a row is found, reads its cells
│   │   ├── 07_07_WT_Pagination.spec.ts      # same walk extracted into a reusable helper
│   │   └── 07_08_WT_Practice.spec.ts        # blogspot BookTable: every row's cells, XPath walk commented
│   ├── 08_Web_Select_Frames_IFrame/
│   │   ├── 08_01_Select.spec.ts             # native <select> driven with selectOption
│   │   ├── 08_02_Custom.spec.ts             # custom dropdowns: test-id trigger + role option
│   │   └── 08_03_Advance.spec.ts            # searchable / multi / creatable / async selects
│   ├── 09_Frame_IFrame/
│   │   ├── 09_01_IFrame.spec.ts             # fills and submits a form inside a frameLocator
│   │   ├── 09_02_Multiple_Frame.spec.ts     # lists every <frame>, clicks a link in the side one
│   │   └── 09_03_Nested_Frame.spec.ts       # three nested frames via contentFrame()
│   ├── 10_Keyboard_Hover_Drag_Drop_Calender/
│   │   ├── 10_01_Keyboard.spec.ts           # keyboard.press on keycode.info, screenshot each hit
│   │   ├── 10_02_Hover_TC.spec.ts           # hover the Add-ons menu, then click FlyEarly
│   │   ├── 10_03_Drag&Drop.spec.ts          # dragTo between the two columns on the-internet
│   │   ├── 10_04_Advance_Drag&Drop.spec.ts  # manual mouse steps onto a Kanban column
│   │   └── 10_05_Context_Drag_Drop.spec.ts  # right-click a target, then click a menu option
│   ├── 11_JS_Alerts/
│   │   └── 11_01_JS_Alert.spec.ts           # dialog handling: alert, confirm and prompt
│   ├── 12_Handle_SVG/
│   │   ├── 12_01_SVG_TC.spec.ts             # Flipkart: click the SVG icon, log product titles
│   │   ├── 12_02_Advance_SVG_TC.spec.ts     # TTA widget: circle, chart bars, star rating
│   │   ├── 12_03_Map_TC.spec.ts             # SimpleMaps India: click the UP state path
│   │   └── 12_04_Map_TC_Optimize.spec.ts    # same map, compact walk over every path
│   ├── 13_Shadow_DOM/
│   │   └── 13_01_Shadow_DOM_TC.spec.ts      # TTA widget: locators pierce the shadow roots
│   ├── 14_FileUpload/
│   │   ├── 14_01_FileUpload_TC.spec.ts      # the-internet upload of testdata.txt
│   │   ├── 14_02_FileUpload_TC.spec.ts      # TTA widget: single-upload input
│   │   ├── 14_03_Multiple_FileUpload_TC.spec.ts        # two in-memory buffers into PatternFly
│   │   ├── 14_04_Multiple_FileUpload_Disk_TC.spec.ts   # real jpegs from disk + dropzone asserts
│   │   ├── 14_05_Mixed_FileUpload_TC.spec.ts           # pdf + jpg + docx from this folder
│   │   ├── 14_06_Mixed_FileUpload_OtherDir_TC.spec.ts  # same, from the root testdata/ folder
│   │   ├── file1.jpeg / file2.jpeg          # Playwright icon cards uploaded by 14_04
│   │   ├── sample.pdf / sample.jpg / sample.docx       # mixed fixtures for 14_05 (copies in testdata/)
│   │   └── testdata.txt                     # small text file for 14_01 / 14_02
│   ├── 15_File_Download/
│   │   └── 15_01_FileDownload_TC.spec.ts    # waitForEvent('download') → saveAs into out/
│   ├── 16_Scroll_ToElement/
│   │   ├── 16_01_Scroll_TC.spec.ts          # scrollIntoViewIfNeeded + scrollTo jumps, with pause
│   │   ├── 16_02_Lazy_Scroll_TC.spec.ts     # lazy list loads 10 → expect.poll until more arrive
│   │   └── 16_03_Abort_Signal_Scroll_TC.spec.ts        # AbortSignal cancels the scroll wait (v1.62+)
│   ├── 17_Expect_Assertions/
│   │   ├── 17_01_Expect1.spec.ts            # value assertions: toBe/toEqual/toBeTruthy, …
│   │   ├── 17_02_Expect2.spec.ts            # locator assertions, and 16 footer links
│   │   ├── 17_03_Expect3.spec.ts            # expect.soft block + .not negation
│   │   ├── 17_04_Expect4.spec.ts            # visible / enabled / checked / toHaveTitle
│   │   └── Expect_Cheatsheet.md             # every common expect assertion, one example each
│   ├── 18_Test_Hooks/
│   │   ├── 18_01_Test.spec.ts               # test.skip / slow / fixme / fail modifiers
│   │   ├── 18_02_Test.spec.ts               # test.step named steps
│   │   ├── 18_03_Testhook.spec.ts           # beforeAll/beforeEach/afterEach/afterAll
│   │   ├── 18_04_TestDescibe.spec.ts        # describe.serial vs parallel standalones
│   │   ├── 18_05_TestPriority.spec.ts       # @p1/@p2/@p3 tags, grep filtering
│   │   ├── TestHooks_Cheatsheet.md          # test API cheat sheet
│   │   └── Chromium_Arguments_List.md       # Chrome launch-args reference
│   ├── 19_Data_Driven_Testing/
│   │   ├── 19_01_DDT.spec.ts                # imports 19_02_Users.json, logs the fields
│   │   ├── 19_02_Users.json                 # tiny data object: username / password
│   │   ├── 19_03_TestData.json              # richer object: nested address + skills array
│   │   ├── 19_04_Login_DDT.spec.ts          # login spec driven by test-data/login.json
│   │   ├── 19_05_Read_Write_FS.ts           # standalone script: fs read + JSON write
│   │   ├── 19_06_DDT_JSON_ARRAY.spec.ts     # inline JSON array, one test() per row
│   │   ├── 19_07_DDT_CSV.spec.ts            # same rows from CSV, asserts the landing URL
│   │   ├── 19_08_JSON_DDT.spec.ts           # registration rows from a JSON file
│   │   ├── 19_09_DDT_EXCEL.spec.ts          # async exceljs read -> beforeAll + test.step per row
│   │   ├── 19_10_DDT_YAML.spec.ts           # sync js-yaml read -> one test() per row
│   │   ├── 19_11_DDT_MYSQL.spec.ts          # async mysql2 read, skipped without MYSQL_HOST
│   │   ├── 19_12_Faker.spec.ts              # five seeded faker-generated users
│   │   ├── output.json                      # written by 19_05 when it runs
│   │   ├── util/
│   │   │   ├── csvReader.ts                 # comma-splitting CSV reader (sync)
│   │   │   ├── yamlReader.ts                # js-yaml loader + the shared LoginRow type (sync)
│   │   │   ├── excelReader.ts               # exceljs workbook -> LoginRow[] (async)
│   │   │   ├── dbReader.ts                  # mysql2 connection + login_data query (async)
│   │   │   └── generateExcel.ts             # regenerates test-data/login-data.xlsx
│   │   └── test-data/
│   │       ├── login.json                   # valid / invalid user for 19_04
│   │       ├── login-data.csv               # seven login rows for 19_07
│   │       ├── login-data.xlsx              # the same rows for 19_09
│   │       ├── login-data.yaml              # the same rows for 19_10
│   │       ├── registration-data.json       # five registration rows for 19_08
│   │       └── seed.sql                     # MySQL schema + the same rows (+ one inactive)
│   ├── 20_Page_Object_Model/
│   │   ├── 20_01_No_POM.spec.ts             # the login flow written inline, no page objects
│   │   ├── 20_02_POM.spec.ts                # the same login boxed into LoginPage
│   │   ├── 20_03_cart_add_assertion.spec.ts # POM cart flow: login -> add item -> cart
│   │   ├── 20_04_Heavy_Page.spec.ts         # the same flow driven by HeavyPages
│   │   └── pages/
│   │       ├── LoginPage.ts                 # TTACart login page object (SnapLocator)
│   │       ├── InventoryPage.ts             # TTACart inventory page object (SnapLocator)
│   │       ├── CartPage.ts                  # TTACart cart page object (SnapLocator)
│   │       └── HeavyPages.ts                # 100 locators + 100 methods, scale sample
│   ├── 21_Calender_Date_Picker/
│   │   ├── 21_01_CalenderDatePicker.spec.ts               # one-way trip, picks a fixed day-<date> cell
│   │   ├── 21_02_CalenderDataPicker_With_Variable.spec.ts # round trip from date variables
│   │   └── 21_03_CalenderDatePicker_With_Utility.spec.ts  # the same flow through a selectDate() helper
│   ├── 22_Multiple_Tab_Window_Handling/
│   │   ├── 22_01_Handling_New_Tab.spec.ts                 # target=_blank link: context.waitForEvent('page')
│   │   └── 22_02_Handling_New_Window.spec.ts              # window.open popup: page.waitForEvent('popup')
│   ├── DailyTask/
│       ├── 01_159_LoginPage.spec.ts         # Katalon Cura login, asserts the page header
│       ├── 02_179_LoginPage.spec.ts         # TTA login with bad credentials, asserts the URL
│       ├── 03_259_WebTable.spec.ts          # TTA employee table: ticks Rohan.Mehta's checkbox
│       ├── 04_299_AllLogic.spec.ts          # QA profile form: fills, checks, saves, verifies JSON
│       ├── 05_1010_Asserrtions.spec.ts      # 10-10 assertion sweep over the TTA login page
│       ├── 1_Oct/
│       │   ├── 01_Hover.spec.ts             # hovers the TTA nav, clicks the Wi-Fi menu item
│       │   └── 02_Applitools.spec.ts        # logs in, sums the amounts column, asserts the net
│       ├── 26/9_Pagination/
│       │   ├── 01_WT_OrangeHRM.spec.ts      # adds an employee in OrangeHRM, then deletes one
│       │   └── 02_WT_FLipkart.spec.ts       # Flipkart search results, walked page by page
│       └── 6_Oct/
│           ├── 01_ShadowDOM.spec.ts         # SelectorsHub XPath practice: shadow-root fields
│           └── 02_UploadProfile.spec.ts     # TTA student dashboard: fill the email step
│   └── Practice_code/
│       ├── cricinfo.spec.ts                 # collects every nav link, clicks the one reading Hindi Videos
│       └── cricinfoTable.spec.ts            # cricinfo search: opens the search box, searches James Franklin
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
├── out/                                    # downloads written by 15_01 (gitignored)
└── test-results/                           # per-run artifacts and traces (gitignored)
```

### Playwright config

`playwright.config.ts` defines:

- **`testDir`** — where your specs live (`./tests`), scanned recursively
- **`projects`** — which browsers to run. Only the `chrome` project is active right now — a desktop Chrome through `channel: 'chrome'`, which launches the Google Chrome installed on the machine, not the bundled Chromium. The firefox and webkit projects are still in the file but commented out, so a run collects each test once instead of three times
- **`use`** — shared options. This project sets `headless: false`, so browsers are visible by default, a fixed `1920 × 1080` viewport, `screenshot: 'on'` and `video: 'on'` so every test produces media for the reports, and `trace: 'on-first-retry'` to capture a trace whenever a test is retried. Individual specs can override this — `05_03` turns screenshots, video, and traces on for every test it runs
- **`reporter`** — three reporters run on every run: `line` (terminal output), `allure-playwright` (writes `allure-results/`), and the custom TTA reporter in `utils/CustomReporter.ts` (writes `tta-report/`). Playwright's built-in `html` reporter is not in the list right now, so `playwright-report/` is not refreshed — add `["html"]` back to the array if you want it
- **`dotenv`** — loads `.env` with `quiet: true` before anything else, so `VWO_*` and `MYSQL_*` are available in `process.env` for every spec and hook, not just for `04_01`
- **`fullyParallel` / `workers` / `retries`** — parallelism and retry behaviour (1 worker and 2 retries only on CI)

## Tests in this repo

### Specs (run by the Playwright test runner)

Files ending in `.spec.ts` are picked up automatically from anywhere under `tests/`. They are grouped into numbered learning tracks, plus `DailyTask/` and `Practice_code/` folders for practice exercises:

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
- **`07_04_WebTable_example3.spec.ts`** — despite the track name this one runs on the multi-element-filter page, and it is about `filter()` rather than tables: it clicks the *Forgotten Password* link through `page.locator('a.list-group-item').filter({ hasText: 'Forgotten Password' })`, then resolves the footer's *Privacy Policy* link the same way and asserts its `href` is `#privacy-policy`. Ends with `page.pause()`.
- **`07_05_WebTable_example4.spec.ts`** — the CSS pseudo-class route to the same checkbox tick as `DailyTask/03`: `page.locator("tr:has(td:text('Rohan.Mehta'))")` narrows the table down to the row containing that cell, and `.locator('input').first()` clicks its checkbox. The commented-out line above it shows the XPath `preceding-sibling::td` equivalent. No `page.pause()` — it waits five seconds instead.
- **`07_06_WT_Pagination.spec.ts`** — walks the paginated table at `https://app.thetestingacademy.com/playwright/tables/webtable` for *Camila Lopez*: a `while` loop filters `#employees-tbody tr` by `hasText` until the row appears, clicking `getByTestId('next-page')` each time and throwing `Row Not Found!!!` once that button is disabled. Then it reads her email and country cells (`td[data-col='email']` / `td[data-col='country']`). Ends with `page.pause()`.
- **`07_07_WT_Pagination.spec.ts`** — the same pagination walk refactored into a reusable `findRowByName(page, name)` helper that returns the matching row `Locator`; the test calls it for *Camila Lopez* and reads the email and country cells. Ends with `page.pause()`.
- **`07_08_WT_Practice.spec.ts`** — `https://testautomationpractice.blogspot.com/`: locates the *BookTable* (`table[name="BookTable"] tbody tr`), logs the row count, and prints each row's cell texts one row at a time. A large commented-out block below keeps the equivalent dynamic-XPath walk — build each cell's path from three fragments, then read `preceding-sibling::td` when a cell contains *Amod*. No pause; it only logs.

**`08_Web_Select_Frames_IFrame/`** — dropdowns, native and custom:

- **`08_01_Select.spec.ts`** — the-internet's native `<select>` page: clicks `#dropdown` and picks *Option 2* with `page.selectOption('#dropdown', 'Option 2')`. Ends with `page.pause()`.
- **`08_02_Custom.spec.ts`** — the TTA dropdowns page, where the controls are custom widgets rather than `<select>` elements: opens the language trigger with `getByTestId('lang-trigger')` and clicks the `getByRole('option', { name: 'Javascript' })` item, then opens the experience trigger and picks *Mid-level (4-6 years)* by exact text. Ends with `page.pause()`.
- **`08_03_Advance.spec.ts`** — the TTA select-boxes page, four flavours of React-Select-style widget: a searchable single select (`#rs-single` → *Cypress*), a multi select with chips (`#rs-multi` → *Pytest* and *JUnit*, closed with `Escape`), a creatable one (`#rs-creatable` → *api-testing* and *security*, confirmed with `Enter`), and an async one (types `de` into `getByTestId('rs-async-input')`, asserts the menu contains *Delhi*, then clicks that option). It ends by logging every option still in the async menu with `allInnerTexts()` and pausing.

**`09_Frame_IFrame/`** — frames and iframes:

- **`09_01_IFrame.spec.ts`** — resolves `#frame-one` with `page.frameLocator()` on the TTA frames page and drives the vehicle-registration form inside it: name, owner, plate, the *SUV* option of the frame's native select, year, and description, then submits with `getByText('Submit registration', { exact: true })` and logs the `#vehicle-output` text. Ends with `page.pause()`.
- **`09_02_Multiple_Frame.spec.ts`** — the multi-frames page: reads the `<h2>` from the `main` frame through `frameLocator("[name='main']")`, collects every `<frame>` element with `page.locator('//frame').all()` (three of them), and logs each one's `name` and `src` — side, main, footer. Finishes by clicking the registration link inside the `side` frame. Ends with `page.pause()`.
- **`09_03_Nested_Frame.spec.ts`** — selectorshub.com's iframe-scenario page: wraps the `#pact1` → `#pact2` → `#pact3` frames with `contentFrame()` and fills one input in each (`#inp_val`, `#jex`, `#glaf`), logs the `h3` heading from the first frame, then waits five seconds before `page.pause()`.

**`10_Keyboard_Hover_Drag_Drop_Calender/`** — keyboard, mouse, and drag-and-drop:

- **`10_01_Keyboard.spec.ts`** — `https://keycode.info`: `page.keyboard.press('A')`, then `ArrowLeft`, then `Shift+O` (followed by `keyboard.up('Shift')` / `keyboard.down('Shift')`), taking a screenshot after each press — `A.png`, `ArrowLeft.png`, and `O.png`, written into the repo root and gitignored. Ends with `page.pause()`.
- **`10_02_Hover_TC.spec.ts`** — SpiceJet: hovers the *Add-ons* menu with `getByText('Add-ons', { exact: true })` and clicks *FlyEarly*, a menu item that only exists while hovering. Ends with `page.pause()`.
- **`10_03_Drag&Drop.spec.ts`** — the-internet's drag-and-drop page: `page.locator('#column-a').dragTo(page.locator('#column-b'))`. Ends with `page.pause()`.
- **`10_04_Advance_Drag&Drop.spec.ts`** — TTA's Kanban board (`/playwright/widgets/dnd`): `dragTo()` does not work here because of focus (noted in a comment), so it reads the source card's and the target column's `boundingBox()`es and drives the mouse manually — `mouse.move()` to the card's centre, `mouse.down()`, `mouse.move()` to the column's centre with `{ steps: 10 }`, then `mouse.up()`. The file also pins the same `1920 × 1080` viewport explicitly with `test.use({ viewport: { width: 1920, height: 1080 } })` at the top. Ends with `page.pause()`.
- **`10_05_Context_Drag_Drop.spec.ts`** — TTA's context-menu page (despite the title, this one is a right-click exercise): right-clicks the first `getByTestId('ctx-target')`, logs every `#ctx-menu span` text with `allInnerTexts()`, then clicks *Copy*. Ends with `page.pause()`.

**`11_JS_Alerts/`** — native browser dialogs:

- **`11_01_JS_Alert.spec.ts`** — the-internet's JavaScript-alerts page, three tests under a `test.describe` with a `beforeEach` navigation: an *alert* accepted after asserting its type and message; a *confirm* accepted, after which `#result` asserts *You clicked: Ok*; and a *prompt* accepted with typed text (*Hello to All of you*), after which `#result` asserts *You entered: …*. Each handler uses `page.once('dialog', …)`; only the first test keeps its trailing `page.pause()`.

**`12_Handle_SVG/`** — SVG elements, widgets, and maps:

- **`12_01_SVG_TC.spec.ts`** — Flipkart again, this time as the SVG exercise: fills the search box (`input[name='q']`) with *macmini*, clicks the first `svg` on the page (the search icon), waits for `networkidle` because the result tiles lazily load, then loops the product-title locator (`//div[contains(@data-id,'MP') or … or 'CPU']/div/a[2]`) and logs every title. Ends with `page.pause()`.
- **`12_02_Advance_SVG_TC.spec.ts`** — TTA's `widgets/svg` playground: clicks the `#circle-blue` shape and asserts `#shapes-output` contains *Blue circle*, clicks the chart button matched by `/Q3 bar/` — a `getByRole` name given as a RegExp means "contains" — picks the *4 stars* radio, then walks every `.bar` element and logs its `data-quarter` and `data-value` attributes. Ends with `page.pause()`.
- **`12_03_Map_TC.spec.ts`** — SimpleMaps' India map: collects the state `path` elements under the map SVG with a `name()` XPath (`//*[name()='svg']/*[name()='path' and contains(@class,'sm_state')]`), logs each `class`, and clicks the path whose class includes *INUP* (Uttar Pradesh). Ends with `page.pause()`.
- **`12_04_Map_TC_Optimize.spec.ts`** — the same map with a shorter selector: walks *every* `path` on the page, logs each non-null class, and clicks the one whose class **ends with** `UP` — no XPath, no `name()` needed. Ends with `page.pause()`.

**`13_Shadow_DOM/`** — elements behind shadow roots:

- **`13_01_Shadow_DOM_TC.spec.ts`** — TTA's shadow-DOM widget. Playwright locators pierce open shadow roots automatically, so ordinary locators drive the custom elements: it scopes to `getByTestId('card-account-card')`, fills the email and password inside it, submits, and asserts `card-account-status` contains the email; clicks `counter-cart`'s *Increment* twice, asserting `counter-value` reads `5`; then fills the nested card through its own `card-inside-*` test ids and submits. Ends with `page.pause()`.

**`14_FileUpload/`** — feeding files to inputs, as buffers and from disk:

- **`14_01_FileUpload_TC.spec.ts`** — the-internet's upload page: passes `testdata.txt` to `setInputFiles` using `path.join(__dirname, 'testdata.txt')`, clicks *Upload*, and asserts `#uploaded-files` contains the filename. The one 14-file without a pause — it asserts instead.
- **`14_02_FileUpload_TC.spec.ts`** — TTA's `widgets/upload-download` page: the same text file into `#single-upload`. Ends with `page.pause()`.
- **`14_03_Multiple_FileUpload_TC.spec.ts`** — PatternFly's multiple-file-upload component with two *in-memory* files: `{ name, mimeType, buffer }` objects built around `Buffer.from(...)`, so nothing has to exist on disk. Ends with `page.pause()`.
- **`14_04_Multiple_FileUpload_Disk_TC.spec.ts`** — the same component with *real files from disk*: `file1.jpeg` and `file2.jpeg` live next to the spec and go in as paths, and the dropzone is then asserted to list `file1.jpeg` / `file2.jpeg`. Ends with `page.pause()`.
- **`14_05_Mixed_FileUpload_TC.spec.ts`** — a mixed three-file set from the spec's own folder: `sample.pdf`, `sample.jpg`, and `sample.docx`. A commented-out block below shows the same upload with dropzone assertions. Ends with `page.pause()`.
- **`14_06_Mixed_FileUpload_OtherDir_TC.spec.ts`** — the same three files, but from the shared `testdata/` folder at the repo root (`path.join(__dirname, '..', '..', 'testdata', …)`) — the pattern to use when fixtures should not sit next to the spec. Ends with `page.pause()`.
- The folder's fixtures: **`testdata.txt`** for 14_01/14_02; **`file1.jpeg`** / **`file2.jpeg`** (Playwright icon cards) for 14_04; **`sample.pdf`** (a minimal but valid PDF), **`sample.jpg`** (another icon card), and **`sample.docx`** (a minimal Word document) for 14_05, with copies in `testdata/` for 14_06. All of these are located with Node's built-in `path` module — the `path` package listed in `package.json` is not what gets imported.

**`15_File_Download/`** — downloads:

- **`15_01_FileDownload_TC.spec.ts`** — TTA's upload-download widget: clicks `getByTestId('download-static')` inside a `Promise.all` together with `page.waitForEvent('download')`, then saves the artifact with `download.saveAs('./out/' + download.suggestedFilename())`. Downloads land in `out/` at the repo root, which is gitignored. Ends with `page.pause()`.

**`16_Scroll_ToElement/`** — scrolling, lazy lists, and cancellable waits:

- **`16_01_Scroll_TC.spec.ts`** — TTA's `widgets/scroll` page, opened in a `beforeEach`. The body collects four numbered approaches and leaves the last two live: `getByTestId('deep-anchor').scrollIntoViewIfNeeded()` then a click, `window.scrollBy(0, 1000)`, `window.scrollTo(0, document.body.scrollHeight)` to jump to the bottom, and `window.scrollTo(0, 0)` to jump back to the top. Ends with `page.pause()`.
- **`16_02_Lazy_Scroll_TC.spec.ts`** — the same page's lazy list: scrolls `section-lazy` and `lazy-list` into view and waits for the first load to land with `await expect(list).toHaveCount(10)` *before* reading the count — read too early, the count is 0 and the poll below would pass without any scroll at all. Back at the top it scrolls `lazy-loader` into view, then `expect.poll` over `list.count()` (message `"expected_items > 10"`, 10-second timeout) asserts the list grew past the initial count, logs the final count, and waits five seconds. No pause.
- **`16_03_Abort_Signal_Scroll_TC.spec.ts`** — two tests. The first scrolls to the list and then calls `list.last().scrollIntoViewIfNeeded({ signal })` with an `AbortController` that aborts after 500 ms — the *last existing* item, because `nth(10)` does not exist yet and would just time out — then polls for the count to grow as in 16_02. The second sets a hidden button, aborts after 500 ms, and asserts the scroll call `rejects.toThrow('aborted')`: the signal cancels the auto-wait instead of letting it run to the timeout. No pause in either test.

**`17_Expect_Assertions/`** — the assertion API, with a cheatsheet:

- **`17_01_Expect1.spec.ts`** — pure value assertions (no locators): `toBe`, `toBeFalsy`, `toBeTruthy`, `toBeNull`, `toBeGreaterThan`, `toEqual` for arrays, and `toEqual` for two objects written with different key order — deep equality ignores property order.
- **`17_02_Expect2.spec.ts`** — locator assertions against the multi-element-filter page: the heading `toBeVisible()` and `toContainText('filter', { timeout: 10000 })`; the email textbox checked with `toHaveAttribute('id', 'email')` and `toHaveAttribute('type', 'email')`, plus one check against a `'palcaeholder'` attribute (misspelled, so nothing matches); and `toHaveCount(16)` on the footer links.
- **`17_03_Expect3.spec.ts`** — soft assertions and negation on the practice-tables page: three `expect.soft` checks on the first-name field (attribute, visibility, empty value) record their own failures and let the test continue, a hard `toBeEnabled()` still runs afterwards, then `#error` is asserted `not.toBeVisible()` and the page title `not` to contain *error*.
- **`17_04_Expect4.spec.ts`** — state assertions: ticks the UFT checkbox and asserts `toBeChecked()`, checks the submit button with `toBeVisible()` / `toBeEnabled()`, then `toHaveTitle(/QA Profile/)` and that the URL contains *thetestingacademy*. Ends with `page.pause()`.
- **`Expect_Cheatsheet.md`** — a formatted interview cheatsheet of `expect`: value assertions, locator assertions, page assertions, API-response `toBeOK`, the `.not` / `expect.soft` / `expect.poll` / `expect.toPass` / `expect.configure` modifiers, and a common-question table.

**`18_Test_Hooks/`** — the `test` API: modifiers, steps, hooks, serial suites, and tags, plus two reference docs:

- **`18_01_Test.spec.ts`** — four tests on the multi-element-filter page, one per modifier: a conditional `test.skip(browserName === 'firefox', …)` in the title test (whose `toHaveTitle` gets a 15-second timeout), a conditional `test.slow(browserName === 'firefox', …)` on the email test, a `test.fixme` for the password test, and a `test.fail()` on a test expecting a *New customer area* that does not exist yet.
- **`18_02_Test.spec.ts`** — the same page driven through three named `await test.step(...)` blocks — *open practice page*, *fields are visible*, *submit+assert validation* (clicks Login and expects the /required|invalid/ text) — so the report shows them as sub-steps rather than one flat test.
- **`18_03_Testhook.spec.ts`** — the full hook set: `beforeAll` logs *beforeAll - server is up*, `beforeEach` opens the TTA practice index, two tests check it (`.index-card` `toHaveCount(47)`, and the sidebar collapse — `getByLabel('Toggle sidebar').first().click()` then `.tta-shell` carries `data-sidebar-collapsed="true"`), an `afterEach` saves a full-page screenshot to `out/fail-<title>.png` only when the test's status differs from its expected one, and `afterAll` logs teardown.
- **`18_04_TestDescibe.spec.ts`** — `test.describe.serial('Checkout suite - must run in order')` holds four console-logging tests that must run in order, while the two top-level tests *standalone A* and *standalone B* sit outside the group and run in parallel.
- **`18_05_TestPriority.spec.ts`** — eight tests that all just navigate to `app.vwo.com`; the point is naming and selection: TC01/TC02, a *Priority 1–3* trio, then three tests tagged `@p1 @smoke`, `@p2`, and `@p3`, with a comment showing `npx playwright test --grep @p1`. The `test.describe.configure({ mode: 'serial' })` line between the groups switches the file's tests to run one after another instead of in parallel.
- **`TestHooks_Cheatsheet.md`** — a cheatsheet of the `test` API: test functions and modifiers, suite variants, the four hooks and their execution order, fixtures/metadata, conditional modifiers, `test.info()` properties, and a `test.step` example.
- **`Chromium_Arguments_List.md`** — a reference of the Chrome/Chromium command-line switches that matter in automation (window/display, headless, CI/Docker, profiles, security, network, media, locale, debugging, feature flags), where to set them in Playwright, and a table of *use the Playwright option instead* mappings.

**`19_Data_Driven_Testing/`** — the same login scenario fed by every data source, plus faker:

- **`19_01_DDT.spec.ts`** — the simplest import path: `19_02_Users.json` is pulled in with a plain `import` (TypeScript's `resolveJsonModule` does the parsing) and the test just logs `username` and `password`. No browser, no assertions — it shows that JSON data arrives as an ordinary JS object.
- **`19_04_Login_DDT.spec.ts`** — two tests under a `test.describe` with a `beforeEach` navigation: `test-data/login.json` holds a `validUser` and an `invalidUser`, and each test fills `#email` / `#password` and clicks `getByTestId('login-button')`. Minimal assertions on purpose — the point here is the file-based data, not the login itself.
- **`19_06_DDT_JSON_ARRAY.spec.ts`** — the classic inline lesson: an array of five objects (`valid credentials` … `both empty`, with `expectedURL` and `shouldPass` fields) is walked by a `for` loop, each row producing a `Login with : <description>` test that fills and clicks. The data lives in the file rather than in a JSON import, so you can see the loop transform rows into tests.
- **`19_07_DDT_CSV.spec.ts`** — the same idea with the data moved out to CSV: `util/csvReader.ts` (a deliberately minimal comma-splitting reader) loads `test-data/login-data.csv` at collection time and each of the seven rows drives `goto` → fill → click → `expect(page).toHaveURL(url => url.href.includes(data.expectedURL))`. A note on the page under test: the practice login is a plain GET form, so every submit lands on `…/multiple_element_filter?email=…#login-success` regardless of credentials, while the browser's own `type=email` validation blocks the SQL-injection row before it ever submits — which is why its `expectedURL` is just the page path.
- **`19_08_JSON_DDT.spec.ts`** — the JSON-file twin of 19_06 for a registration form: five rows from `test-data/registration-data.json` (with `confirmPassword` and `expectedError` fields) each become a test, under a `beforeEach` + `afterEach` pair whose `testInfo.status` logging shows hook ordering. The per-row assertions are left commented out as an exercise.
- **`19_09_DDT_EXCEL.spec.ts`** — Excel: `exceljs` is asynchronous and Playwright collects tests synchronously, so the seven rows from `test-data/login-data.xlsx` are loaded in `beforeAll` and replayed as one `test.step()` per row inside a single test — each step still shows up separately in the report. Regenerate the workbook with `npx tsx tests/19_Data_Driven_Testing/util/generateExcel.ts`.
- **`19_10_DDT_YAML.spec.ts`** — YAML: `js-yaml` is synchronous, so `readYAML` runs at module load and every row becomes its own test, with its own report entry and retry — the closest match to 19_07 among the file-based readers. It also asserts that `shouldPass` came through as a real boolean.
- **`19_11_DDT_MYSQL.spec.ts`** — MySQL: `mysql2/promise` reads `login_data` filtered with `WHERE is_active = 1` and maps the snake_case columns to the shared `LoginRow` shape. The suite skips itself unless `MYSQL_HOST` is set, so a normal run reports it as skipped. Seed the table with `mysql -u root -p < tests/19_Data_Driven_Testing/test-data/seed.sql`.
- **`19_12_Faker.spec.ts`** — faker: five users built at load time with `faker.helpers.multiple()` and a fixed `faker.seed(42)`. The seed is not decoration — Playwright re-evaluates the file in the worker, and without it the freshly generated titles never match the collected ones, so every test fails with *Test not found in the worker process*.
- **`util/`** — the four readers (`csvReader`, `yamlReader`, `excelReader`, `dbReader`) and the `LoginRow` type they all produce, plus `generateExcel.ts` which regenerates the workbook. Compare them side by side: CSV and YAML are synchronous (data ready at collection time, one `test()` per row), while Excel and MySQL are async (rows arrive in a hook and are replayed as steps).
- **`test-data/`** — one dataset in every format: `login-data.csv`, `login-data.xlsx`, `login-data.yaml` and `seed.sql` all carry the same seven login rows (plus a retired, `is_active = 0` row that only the MySQL seed has), `registration-data.json` holds the five registration rows for 19_08, and `login.json` the valid/invalid pair for 19_04. The track is a comparison of readers, not of data.

**`20_Page_Object_Model/`** — the page object model, on the TTACart shop:

- **`20_01_No_POM.spec.ts`** — the baseline to compare everything against: the multi-element-filter login written inline (a data object, three locators, fill → fill → click) and closed with `expect(page).toHaveURL(data.expectedURL)` where `expectedURL` is `/admin/` — a regex that only matches because the typed email lands in the query string.
- **`20_02_POM.spec.ts`** — the same login with the moving parts boxed into `LoginPage`: `new LoginPage(page)`, `goto()`, `login('standard_user', 'tta-secret')`, then a title assertion. Small thing to notice: the app's password is `tta_secret` (underscore) and this spec passes `tta-secret` (hyphen), so the app shows *"Epic sadface: Username and password do not match any user in this service"* and the test asserts the title of the login page it never leaves.
- **`20_03_cart_add_assertion.spec.ts`** — the first complete POM flow, in three `test.step`s: log in with `LoginPage`, add the first item with `Inventorypage`, open the cart and verify the item with `Cartpage` (asserting the `/cart` URL and the item name). Each step attaches a screenshot named `step-N-…` — that prefix is how the custom reporter binds the image, and each step's video segment, to its step in the report.
- **`20_04_Heavy_Page.spec.ts`** — the same three steps, but every interaction goes through `pages/HeavyPages.ts` (`locator001` fills the username, `locator004` adds the item, `locator006` opens the cart, `locator016` proves the T-shirt is on the cart page). Two facts this flow makes you learn the hard way: the cart URL is `…/ttacart/cart`, not `cart.html` — the site strips the extension — and `getByTestId` matches nothing on these apps because they mark elements with `data-test` while Playwright looks for `data-testid` by default.
- **`pages/`** — three SnapLocator-generated page objects (`LoginPage`, `Inventorypage`, `Cartpage`) whose locators lead with `getByTestId(...)` and chain `.or(...)` fallbacks (the fallbacks are what carry the flow today, given the `data-test` point above), plus **`HeavyPages.ts`**: a scale sample with 100 locators across every strategy — roles, labels, placeholders, text, test ids, CSS, XPath, `first()` chains, a `filter()` — and 100 one-line action methods rotating through click / fill / textContent / isVisible / hover / count / scrollIntoViewIfNeeded / getAttribute / press / inputValue.

**`21_Calender_Date_Picker/`** — the TTA calendar widget (`/playwright/widgets/calendar`), three takes on one booking flow:

- **`21_01_CalenderDatePicker.spec.ts`** — the direct route: picks the *One-way* tab, opens the depart trigger, waits for `date-picker` to be visible, clicks a hard-coded day cell (`day-2026-11-22`), presses *Search flights*, and asserts that date comes back in `search-output`. Ends with `page.pause()`.
- **`21_02_CalenderDataPicker_With_Variable.spec.ts`** — the same booking with the dates pulled out into `departureDate` / `returnDate` variables (the shape the data could arrive in from a config or data file): round trip, both pickers asserted visible, one `next-month` click to reach the return month, then the same `search-output` assertions for both dates. Ends with `page.pause()`.
- **`21_03_CalenderDatePicker_With_Utility.spec.ts`** — the flow refactored into an `async function selectDate(page, date)`: assert the picker is visible, build the `day-<date>` locator inside it, click *next month* until that cell exists — capped at 24 clicks, so an unreachable date fails instead of looping forever — then click it. The spec calls the helper for both legs, which is what walks the calendar forward to the January 2027 return date. Ends with `page.pause()`.

**`22_Multiple_Tab_Window_Handling/`** — pages that open outside the current one:

- **`22_01_Handling_New_Tab.spec.ts`** — the OrangeHRM demo's *OrangeHRM, Inc* link opens a new **tab**. The click and `context.waitForEvent('page')` are raced inside a single `Promise.all`, so the listener is armed before the click; the new page is then awaited, its `domcontentloaded` state waited for, its title logged, and a `.page-title h1` assertion run — all before `page.bringToFront()` returns to the original tab to fill the username field and `newPage.close()` shuts the tab down. Note the `waitUntil` / `timeout` lines after the `goto` are stray labels rather than options, so the navigation runs with the defaults. Ends with `page.pause()`.
- **`22_02_Handling_New_Window.spec.ts`** — a **popup window** instead: `page.setContent()` injects a button whose `onclick` calls `window.open('https://www.orangehrm.com', '_blank', 'width=600, height=400')`, so the popup is sized independently. The handler is armed with `page.waitForEvent('popup')` *before* the click, then the popup is awaited, its title logged, the same heading asserted, closed, and the original page brought back to the front to assert the button is still visible. Ends with `page.pause()`.

**`DailyTask/`** — day-to-day practice exercises:

- **`01_159_LoginPage.spec.ts`** — clicks "Make Appointment" on the Katalon Cura demo app, logs in as `John Doe`, and asserts the header on the appointment page.
- **`02_179_LoginPage.spec.ts`** — logs into the Testing Academy multi-element-filter page with deliberately wrong credentials (CSS `#email` / `#password` locators, XPath for the checkbox and button) and asserts the URL it lands on includes the submitted email, password, and `remember=yes` plus the `#login-success` fragment. Pauses at the end.
- **`03_259_WebTable.spec.ts`** — opens `https://app.thetestingacademy.com/playwright/webtable` and counts the rows and columns of the table labelled *Employee Management System table*, building the XPath from the same three fragments as `07_02`. Those counts then drive a nested loop that generates each cell's path, reads it with `innerText()`, and logs every cell; when a cell contains *Rohan.Mehta* it clicks that row's checkbox via `preceding-sibling::td`. Ends with `page.pause()` so you can see the tick land.
- **`04_299_AllLogic.spec.ts`** — the TTA practice-tables page's "QA profile" form: fills first and last name (`getByTestId`), picks the *Male* radio, sets years of experience with `selectOption`, fills the date field, and selects *Automation Tester* through `locator("[name='profession']").nth(1)`. It then loops every `input[name='tools']` checkbox, checking each and logging its value with `getAttribute()`, checks the first three continents, clicks the *Wait Commands* tab (`getByTestId('tab-wait')`) and *Save profile*, and parses the JSON echoed into `#submission-output` — asserting the name, gender, years, date, and profession fields plus the full `tools` (`["UFT","Protractor","Selenium Webdriver"]`) and `continents` (`["Asia","Europe","Africa"]`) arrays. Ends with `page.pause()`.
- **`05_1010_Asserrtions.spec.ts`** — a 10-10 assertion sweep over the multi-element-filter login page: one test in a `test.describe` with a `beforeEach` walks the assertion API — `toHaveURL`, a string `toContain`, `toHaveTitle(/Multiple Element/)` — then checks the elements: the login heading (`toBeVisible`, `toBeEnabled`, `toContainText`), `h2` `toHaveText('Student Login')`, the *Secure Practice* badge (`toContainText` and `.not`), the email field (`toHaveId`, id/type `toHaveAttribute`, `toHaveValue` after a fill, and a `.not` value check), the password field (`toBeFocused` after a click, `toBeEditable`, `toBeEmpty`), the login button's text and the *Forget password?* link's `toBeEnabled`, the *Remember me* checkbox (`check()` then `toBeChecked`), `toHaveCount(2)` on the social-row links, and two title checks (`not` to contain *error*, `toBeTruthy`). A commented-out password-attributes block sits mid-file. Ends with `page.pause()`.

The `1_Oct/` subfolder holds the next session, from 01-10:

- **`01_Hover.spec.ts`** — TTA's hover-menu page: hovers `getByTestId('nav-add-ons')`, clicks the *Wi-Fi* menuitem, reads `div.submission-output`, and asserts it contains *Wi-Fi*. Ends with `page.pause()`.
- **`02_Applitools.spec.ts`** — the Applitools demo bank: logs in through the placeholder username input, `#password`, and `.btn.btn-primary`, asserts it lands on `app.html`, then counts the transaction table's rows and columns with XPath and collects the amount column (`td[5]`). The strings are stripped of `USD` and commas with chained `.replace()` calls and mapped to numbers; positive and negative amounts are summed separately and the net difference is asserted to be `1996.22`. Ends with `page.pause()`.

A `26/9_Pagination/` subfolder holds an extra round of practice from 26-09 (the folder was renamed from `26/9/` to say what the files are about; the specs themselves are unchanged):

- **`01_WT_OrangeHRM.spec.ts`** — the OrangeHRM demo end to end: logs in as `Admin` / `admin123`, opens PIM, adds an employee (*Dev Singh Meena*, id `800014`), switches to the Employee List, searches for *Gopal*, and clicks the matching row's trash icon. A large block of commented-out pagination code sits at the bottom — the loop that pages through the list until the row appears, plus earlier attempts that used `div.oxd-table-card` and the pagination buttons. Ends with `page.pause()`.
- **`02_WT_FLipkart.spec.ts`** — Flipkart: dismisses the login popup (`//span[@role='button']`), searches *DSLR Camera* through `getByRole('textbox', { name: 'Search for Products, Brands and More' })`, then loops the results pages — on each page it logs every camera name (`div.RG5Slk`) and price (`div.hZ3P6w.DeU9vF`), follows the *Next* link's `href` with `page.goto()`, and stops when there is no Next link or no `href`. Ends with `page.pause()`.

A `6_Oct/` subfolder holds the 06-10 session:

- **`01_ShadowDOM.spec.ts`** — SelectorsHub's XPath-practice page, aiming at its shadow-root widget: scopes to `#userName`, fills the *enter name* field with *Dominoz* and *Enter pizza name* with *cheese*, then presses `Tab` three times and types a password, relying on Playwright reaching straight through the shadow boundaries. Ends with `page.pause()`.
- **`02_UploadProfile.spec.ts`** — TTA's student dashboard: fills the email field (`getByPlaceholder('Enter your email address')`) and clicks the exact *Continue* button — the email step of the sign-in flow. Ends with `page.pause()`.

**`Practice_code/`** — scratch specs kept out of the numbered tracks:

- **`cricinfo.spec.ts`** — goes to `https://www.cricinfo.com/` and collects every nav link with `page.locator('ul li a').allInnerTexts()`, logs the count and each label, and clicks the one reading *Hindi Videos* via `page.getByText(lt).first()`. Ends with `page.pause()`. (The `lstatSync` import at the top is left over and unused.)
- **`cricinfoTable.spec.ts`** — the search route on the same site: clicks the search icon (`i.icon-search-outlined`), fills *James Franklin* into `getByPlaceholder('Search Players, Teams or Series', { exact: true })`, and presses `Enter`. Ends with `page.pause()`.

New specs start from `template/template.spec.ts` at the repo root — a date comment, the `@playwright/test` import, a `test()` whose title is there to replace, `page.goto`, a `// Code` marker, and a trailing `page.pause()`. It sits outside `testDir`, so the runner never collects it; copy it into the relevant numbered track and fill in the title, URL, and steps.

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

Six files are plain scripts, not `test()` specs: three under `tests/01_Basics/`, one under `tests/04_Session_Storage/`, and two under `tests/19_Data_Driven_Testing/`. Most import from `playwright` (the library) rather than `@playwright/test` (the runner), so they are executed directly instead of being run as tests; the two data-track scripts never open a browser at all, they only read and write files:

- **`01_03_normal_pw.ts`** — launches Chromium, creates a context and a page, goes to `https://example.com`, logs the page title, then closes page → context → browser in that order.
- **`01_04_multiple_context.ts`** — launches a single browser and opens two independent contexts, one for an admin user and one for a viewer, each with its own page and session. This is the pattern to reach for whenever a test needs more than one logged-in user at a time.
- **`01_05_BCP.spec.ts`** — the same browser → context → page walkthrough with comments at each level and the matching teardown. Despite the `.spec.ts` name it declares no tests, so the runner collects nothing from it; rename it to `.ts` if you would rather keep it out of collection entirely.
- **`04_01_SessionStorage.ts`** — the session saver described above; it reads credentials from `.env` and writes `user-session.json` for the 04 and 05 tracks, and fails fast with a clear error when `VWO_USER` / `VWO_PASS` are missing.
- **`19_05_Read_Write_FS.ts`** — reading and writing JSON without a browser: it loads `19_02_Users.json` with `readFileSync` + `JSON.parse` (path built from `__dirname`, so the read works from anywhere) and writes `output.json` with `writeFileSync`. The write path is relative to the working directory, so run it from inside `tests/19_Data_Driven_Testing/` to keep the file next to the spec.
- **`util/generateExcel.ts`** — regenerates `test-data/login-data.xlsx` from the same seven rows the CSV and YAML fixtures carry, written in CommonJS `require` style with an async IIFE.

Run them with a TypeScript runner:

```bash
npx tsx tests/01_Basics/01_03_normal_pw.ts
npx tsx tests/01_Basics/01_04_multiple_context.ts
npx tsx tests/01_Basics/01_05_BCP.spec.ts
npx tsx tests/04_Session_Storage/04_01_SessionStorage.ts
cd tests/19_Data_Driven_Testing && npx tsx 19_05_Read_Write_FS.ts   # keeps output.json in the folder
npx tsx tests/19_Data_Driven_Testing/util/generateExcel.ts
```

Running `node tests/01_Basics/01_03_normal_pw.ts` directly does not work here: `package.json` sets `"type": "commonjs"`, so Node treats `.ts` files as CommonJS TS and rejects the ESM `import` statements with `SyntaxError: Cannot use import statement outside a module`. A runner such as `tsx` handles the TypeScript and the module interop for you.

## Environment variables

`.env.example` holds the template for the credentials and connection details the suite can use:

```text
VWO_USER=
VWO_PASS=

# optional — enables the 19_11 MySQL suite
MYSQL_HOST=
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=playwright_ddt
```

Copy it to `.env` and fill in your own account:

```bash
cp .env.example .env       # Windows: copy .env.example .env
```

`.env` is loaded by `dotenv` in `playwright.config.ts` (so every spec sees the variables) and read directly in `04_01_SessionStorage.ts`. The `MYSQL_*` values are optional: `19_11` skips itself while `MYSQL_HOST` is empty, and the seed for the `playwright_ddt` schema lives in `tests/19_Data_Driven_Testing/test-data/seed.sql`. `.env` is gitignored — only the empty template is committed. Never hardcode credentials in a spec, since this repo is public.

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

> **Note** — fifty-three specs call `page.pause()` at the end, which opens the Inspector and waits for you to resume: `03_03_Fresh.spec.ts`, `03_04_Project3.spec.ts`, `03_05_getByRole.spec.ts`, `03_06_getByRole.spec.ts`, `06_01_ME.spec.ts`, `06_02_ME.spec.ts`, `07_01_WebTable.spec.ts`, `07_03_WebTable_example2.spec.ts`, `07_04_WebTable_example3.spec.ts`, `07_06_WT_Pagination.spec.ts`, `07_07_WT_Pagination.spec.ts`, all of `08_Web_Select_Frames_IFrame/`, `09_Frame_IFrame/`, `10_Keyboard_Hover_Drag_Drop_Calender/`, and `12_Handle_SVG/` (fifteen files), the first test of `11_01_JS_Alert.spec.ts`, `13_01_Shadow_DOM_TC.spec.ts`, five of the six `14_FileUpload/` specs (`14_01` asserts instead), `15_01_FileDownload_TC.spec.ts`, `16_01_Scroll_TC.spec.ts`, `17_04_Expect4.spec.ts`, and ten DailyTask specs (`02_179_LoginPage.spec.ts`, `03_259_WebTable.spec.ts`, `04_299_AllLogic.spec.ts`, `05_1010_Asserrtions.spec.ts`, `1_Oct/01_Hover.spec.ts`, `1_Oct/02_Applitools.spec.ts`, `26/9_Pagination/01_WT_OrangeHRM.spec.ts`, `26/9_Pagination/02_WT_FLipkart.spec.ts`, `6_Oct/01_ShadowDOM.spec.ts`, `6_Oct/02_UploadProfile.spec.ts`), and seven more — the three `21_Calender_Date_Picker/` specs, both `22_Multiple_Tab_Window_Handling/` specs, and both `Practice_code/` specs. (`07_05_WebTable_example4.spec.ts` has its pause commented out and waits five seconds instead.) A full run stops at each one, so comment those lines out (or run the specific file you are working on) when you want a clean pass.

> **Note** — the 04 and 05 specs depend on `user-session.json`, which does not exist until you run `04_01_SessionStorage.ts`. Without it they load an empty state, land on the login page, and fail their URL assertions.

Run a single test file or a whole track:

```bash
npx playwright test tests/01_Basics/01_01_example.spec.ts
npx playwright test tests/03_Locator_Commands
```

Specs run once per active project — chrome only, since the firefox and webkit projects are commented out — so `npx playwright test --list` currently reports 156 tests across 93 spec files (94 `.spec.ts` files exist in total; `01_05_BCP.spec.ts` declares no tests). 34 of those tests belong to the data-driven track and 4 to the page object model track. To see what would run without launching a browser:

```bash
npx playwright test --list
```

Run only one browser, or force the browser to stay hidden:

```bash
npx playwright test --project=chrome
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
