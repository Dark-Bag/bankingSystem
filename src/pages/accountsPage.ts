import {Locator, expect} from '@playwright/test';
import { basePage } from '../base/basePage';

export class accountsPage extends basePage {

    async verifyAccountsPage() {

         await this.basePageClickElement(this.page.getByTestId('sidebar-link-accounts'));
         await expect(this.page.locator('tr[data-account-type="checking"]')).toBeVisible();
         await expect(this.page.locator('tr[data-account-type="savings"]')).toBeVisible();

     }

     async verifyAccountDetails() {

         await this.basePageClickElement(this.page.getByTestId('sidebar-link-accounts'));
         await expect(this.page.locator('tr[data-account-type="checking"]')).toBeVisible();
         await expect(this.page.locator('tr[data-account-type="savings"]')).toBeVisible();
         await this.basePageClickElement(this.page
            .getByRole('row', { name: /Everyday Checking/ })
            .getByTestId('view-account-btn'));


       await expect(this.page.getByText('****4321')).toBeVisible();

    }
    async verifyOverdraftBanner() {

         await this.basePageClickElement(this.page.getByTestId('sidebar-link-accounts'));
         await expect(this.page
            .getByRole('row', { name: /Everyday Checking/ })
            .getByTestId('account-row-overdrawn')).toBeVisible();
    }

      async verifyFrozenBanner() {
         await expect(this.page
            .getByTestId('frozen-account-banner')).toBeVisible();
    }

    async verifyAddAccountFunctionality(accountName: string, amount: string) {

         await this.basePageClickElement(this.page.getByTestId('sidebar-link-accounts'));
         await expect(this.page.locator('tr[data-account-type="checking"]')).toBeVisible();
         await this.basePageClickElement(this.page.getByTestId('add-account-btn'));
         await this.basePageEnterText(this.page.getByPlaceholder('e.g. Everyday Checking'), accountName);
         await this.basePageClickElement(this.page.locator('#account-form-type-trigger'));
         await this.basePageClickElement(this.page.getByRole('option', { name: 'Savings' }));
         await this.basePageEnterText(this.page.getByPlaceholder('0.00'), amount);
         await this.basePageClickElement(this.page.getByTestId('save-account-form-btn'));

     }
}