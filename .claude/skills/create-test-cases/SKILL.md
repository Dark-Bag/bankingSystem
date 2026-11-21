---
name: create-test-cases
description: Design test cases and write Playwright (TypeScript) specs for the Bank Demo app. Use when asked to create, add, or extend test cases, specs, or page objects for a feature such as login, dashboard, accounts, transfers, or send money.
---

# Create test cases (Bank Demo, Playwright + TypeScript)

Work in two phases. Show the test case list first, then write code.

## Phase 1: Design the test cases

1. Read the existing page class and spec for the feature (e.g. `src/pages/loginPage.ts`, `tests/loginTests.spec.ts`) so you do not duplicate cases.
2. List cases before coding, each with: ID, title, preconditions, steps, expected result.
3. Cover, where they apply:
   - Happy path for each relevant role (`admin`, `viewer`).
   - Negative cases: invalid input, wrong credentials, special users (`overdraft`, `frozen`).
   - Boundaries and validation: amounts (zero, negative, insufficient funds), routing number (9 digits valid, 1-8 invalid), account number (8-17 digits; test 7, 8, 17, 18).
   - Permissions: what a `viewer` can and cannot do. Check the app's behavior; do not assume.
4. Ask the user to confirm the list when it is large or the expected behavior is unclear.

## Phase 2: Write the code

### Project layout
- `src/base/basePage.ts`: shared actions. Page classes extend it.
- `src/pages/`: one class per page, file named `<feature>Page.ts` in camelCase (e.g. `transferPage.ts`).
- `src/fixtures/customFixtures.ts`: registers every page object as a fixture.
- `src/data/testData.ts`: users and faker-generated data.
- `tests/`: specs named `<feature>Tests.spec.ts`.

### Page class rules
1. Class names are camelCase and match the file, e.g. `export class loginPage extends basePage`.
2. Use the base methods for actions: `basePageGoToUrl`, `basePageClickElement`, `basePageEnterText`, `basePageVerifyElementIsVisible`. Add a new `basePage*` method only if the action is reusable across pages.
3. Locator preference: `getByTestId` first, then `#id` or `aria-label`, then `getByRole`/`getByText`. Avoid CSS chains and XPath.
4. Name methods by user intent (`userLogin`, `failedUserLogin`), not by UI mechanics.
5. No hard sleeps (`waitForTimeout`) and no `page.pause()` in committed code.
6. Reuse an existing page class when the feature lives on that page. Create a new class only for a new page.

### Adding a new page
1. Create `src/pages/<feature>Page.ts` extending `basePage`.
2. Register it in `src/fixtures/customFixtures.ts` (add to the `CustomFixtures` type and to `base.extend`).
3. Use it in specs through the fixture, never with `new`.

### Spec rules
1. Import from the fixtures and data files:
   `import { expect, test } from '../src/fixtures/customFixtures';`
   `import { validUsers, invalidUsers } from '../src/data/testData';`
2. Title format: `TC-<AREA>-<NNN>: <Description>` (e.g. `TC-TRANSFER-004: Fail transfer with insufficient funds`). Continue numbering from the highest existing ID in that area.
3. Start each test with `await <page>.basePageGoToUrl('');` (baseURL comes from the Playwright config).
4. Every test must assert an observable outcome (URL, visible element, text, error message). A test that only performs actions is incomplete.
5. Only destructure the fixtures the test actually uses. Do not leave unused parameters like `page`.
6. Specs contain no raw selectors. Add a page method instead.

### Test data rules
1. Credentials come from `validUsers` and `invalidUsers`. Never hard-code usernames or passwords in specs.
2. Use `randomData` (faker) for amounts, names, and bank details. Add new entries to `testData.ts` when needed, grouped by purpose.
3. Never commit real credentials or real account numbers.

## Definition of done
1. Run the new spec with `npx playwright test tests/<file>.spec.ts --repeat-each=3`. All runs must pass.
2. If a test fails, find the root cause (check the trace or error output). Do not weaken or remove assertions to get green.
3. Report: the test cases added (ID and title), files created or changed, and the final pass count.