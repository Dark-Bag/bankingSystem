import {Locator, expect} from '@playwright/test';
import { basePage } from '../base/basePage';

export class transferPage extends basePage {

    async verifyTransferPage() {

         await this.basePageClickElement(this.page.getByTestId('sidebar-link-transfer'));
         await expect(this.page.getByTestId('transfer-amount-input')).toBeVisible();

     }

     async verifyInsufficientFundsValidation(amount: string) {

       await this.basePageClickElement(this.page.getByTestId('sidebar-link-transfer'));
       await this.basePageClickElement(this.page.locator('#transfer-from-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'Everyday Checking' }));
       await this.basePageClickElement(this.page.locator('#transfer-to-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'High-Yield Savings' }));
       await this.basePageEnterText(this.page.getByTestId('transfer-amount-input'), amount);
       await this.basePageClickElement(this.page.getByTestId('review-transfer-btn'));
       await expect(this.page.getByTestId('transfer-confirm-dialog')).toBeVisible();
       await this.basePageClickElement(this.page.getByTestId('confirm-transfer-btn'));
       await expect(this.page.getByTestId('transfer-error-message')).toBeVisible();

     }

     async verifySuccessfulTransfer(amount: string) {

       await this.basePageClickElement(this.page.getByTestId('sidebar-link-transfer'));
       await this.basePageClickElement(this.page.locator('#transfer-from-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'Everyday Checking' }));
       await this.basePageClickElement(this.page.locator('#transfer-to-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'High-Yield Savings' }));
       await this.basePageEnterText(this.page.getByTestId('transfer-amount-input'), amount);
       await this.basePageClickElement(this.page.getByTestId('review-transfer-btn'));
       await expect(this.page.getByTestId('transfer-confirm-dialog')).toBeVisible();
       await this.basePageClickElement(this.page.getByTestId('confirm-transfer-btn'));
       await expect(this.page.getByTestId('transfer-success-heading')).toBeVisible();

    }

    async verifyScheduledTransferFunctionality(amount: string, date: string) {

       await this.basePageClickElement(this.page.getByTestId('sidebar-link-transfer'));
       await this.basePageClickElement(this.page.locator('#transfer-from-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'Everyday Checking' }));
       await this.basePageClickElement(this.page.locator('#transfer-to-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'High-Yield Savings' }));
       await this.basePageEnterText(this.page.getByTestId('transfer-amount-input'), amount);
       await this.basePageClickElement(this.page.getByTestId('schedule-transfer-btn'));
       await this.basePageEnterText(this.page.getByPlaceholder('yyyy/mm/dd'), date);
       await this.basePageClickElement(this.page.getByTestId('review-transfer-btn'));
       await expect(this.page.getByTestId('transfer-confirm-dialog')).toBeVisible();
       await this.basePageClickElement(this.page.getByTestId('confirm-transfer-btn'));
       await expect(this.page.getByTestId('transfer-scheduled-message')).toBeVisible();
}

async verifyTransferBalanceUpdate(amount: string) {
    await this.basePageClickElement(this.page.getByTestId('sidebar-link-transfer'));
       await this.basePageClickElement(this.page.locator('#transfer-from-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'Everyday Checking' }));
       await this.basePageClickElement(this.page.locator('#transfer-to-trigger'));
       await this.basePageClickElement(this.page.getByRole('option', { name: 'High-Yield Savings' }));
       await this.basePageEnterText(this.page.getByTestId('transfer-amount-input'), amount);
       await this.basePageClickElement(this.page.getByTestId('review-transfer-btn'));
       await expect(this.page.getByTestId('transfer-confirm-dialog')).toBeVisible();
       await this.basePageClickElement(this.page.getByTestId('confirm-transfer-btn'));
       await expect(this.page.getByTestId('transfer-success-heading')).toBeVisible();
       await this.basePageClickElement(this.page.getByTestId('sidebar-link-dashboard'));
     
}

}