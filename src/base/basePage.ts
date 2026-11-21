import { Page, Locator, expect } from '@playwright/test';

export class basePage {

    constructor(public page: Page) {}

    // Reusable methods for common actions on the page
    async basePageGoToUrl(url: string) {
        await this.page.goto(url);
    }

    async basePageClickElement(locator: Locator) {
        await locator.click();
    }

    async basePageEnterText(locator: Locator, text: string) {
        await locator.clear();
        await locator.fill(text);
    }

    // For input and textarea fields only (uses inputValue)
    async basePageGetTextValue(locator: Locator): Promise<string> {
        return await locator.inputValue();
    }

    // For any other element: headings, labels, balances, messages
    async basePageGetText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }

    async basePageVerifyElementIsVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async basePageVerifyElementContainsText(locator: Locator, text: string | RegExp) {
        await expect(locator).toContainText(text);
    }
}