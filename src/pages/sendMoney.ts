import {Locator, expect} from '@playwright/test';
import { basePage } from '../base/basePage';

export class sendMoneyPage extends basePage {

    async verifySendPage() {

         await this.basePageClickElement(this.page.getByTestId('sidebar-link-send-money'));
         await expect(this.page.getByTestId('send-money-page-title')).toBeVisible();

     }

     async verifyAddNewPayeeValidation(
        payeeName: string, 
        bankName: string, 
        bankRoutingNumber: string, 
        bankAccountNumber: string
    ) {
        await this.basePageClickElement(this.page.getByTestId('sidebar-link-send-money'));
        await this.basePageClickElement(this.page.getByTestId('add-payee-btn'));
        await this.basePageEnterText(this.page.getByTestId('add-payee-name-input'), payeeName);
        await this.basePageEnterText(this.page.getByTestId('add-payee-bank-input'), bankName);
        await this.basePageEnterText(this.page.getByTestId('add-payee-routing-input'), bankRoutingNumber);
        await this.basePageEnterText(this.page.getByTestId('add-payee-account-input'), bankAccountNumber);
        await this.basePageClickElement(this.page.getByTestId('save-add-payee-btn'));
        await expect(this.page.getByTestId('add-payee-error-message')).toBeVisible();
     }

     async verifySuccessfullySentMoney(amount: string) {
        await this.basePageClickElement(this.page.getByTestId('sidebar-link-send-money'));
        await this.basePageClickElement(this.page.getByTestId('send-from-account-select'));
        await this.basePageClickElement(this.page.locator('[data-testid="send-from-option"][data-account-id="acc-checking-1"]'));
        await this.basePageClickElement(this.page.getByTestId('payee-select'));
        await this.basePageClickElement(this.page.locator('[data-payee-id="payee-002"]'));
        await this.basePageEnterText(this.page.getByTestId('send-amount-input'), amount);
        await this.basePageClickElement(this.page.getByTestId('review-send-btn'));
        await expect(this.page.getByTestId('send-money-confirm-dialog')).toBeVisible();
        await this.basePageClickElement(this.page.getByTestId('confirm-send-btn'));
        await expect(this.page.getByTestId('send-success-heading')).toBeVisible();
     }

     async verifySuccessfullySavePayeeAndSendMoney(payeeName: string, bankName: string, 
        bankRoutingNumber: string, bankAccountNumber: string, amount: string) {
        await this.basePageClickElement(this.page.getByTestId('sidebar-link-send-money'));
        await this.basePageClickElement(this.page.getByTestId('add-payee-btn'));
        await this.basePageEnterText(this.page.getByTestId('add-payee-name-input'), payeeName);
        await this.basePageEnterText(this.page.getByTestId('add-payee-bank-input'), bankName);
        await this.basePageEnterText(this.page.getByTestId('add-payee-routing-input'), bankRoutingNumber);
        await this.basePageEnterText(this.page.getByTestId('add-payee-account-input'), bankAccountNumber);
        await this.basePageClickElement(this.page.getByTestId('save-add-payee-btn'));
        //await expect(this.page.getByTestId('add-payee-success-message')).toBeVisible();
        await this.basePageClickElement(this.page.getByTestId('send-from-account-select'));
        await this.basePageClickElement(this.page.locator('[data-testid="send-from-option"][data-account-id="acc-checking-1"]'));
        await this.basePageClickElement(this.page.getByTestId('payee-select'));
        await this.basePageClickElement(this.page.locator('[data-payee-id="payee-002"]'));
        await this.basePageEnterText(this.page.getByTestId('send-amount-input'), amount);
        await this.basePageClickElement(this.page.getByTestId('review-send-btn'));
        await expect(this.page.getByTestId('send-money-confirm-dialog')).toBeVisible();
        await this.basePageClickElement(this.page.getByTestId('confirm-send-btn'));
        await expect(this.page.getByTestId('send-success-heading')).toBeVisible();
     }

     async verifyInsufficientFundsValidation(amount: string) {
        await this.basePageClickElement(this.page.getByTestId('sidebar-link-send-money'));
        await this.basePageClickElement(this.page.getByTestId('send-from-account-select'));
        await this.basePageClickElement(this.page.locator('[data-testid="send-from-option"][data-account-id="acc-checking-1"]'));
        await this.basePageClickElement(this.page.getByTestId('payee-select'));
        await this.basePageClickElement(this.page.locator('[data-payee-id="payee-002"]'));
        await this.basePageEnterText(this.page.getByTestId('send-amount-input'), amount);
        await this.basePageClickElement(this.page.getByTestId('review-send-btn'));
        await expect(this.page.getByTestId('send-money-confirm-dialog')).toBeVisible();
        await this.basePageClickElement(this.page.getByTestId('confirm-send-btn'));
        await expect(this.page.getByTestId('send-money-error')).toBeVisible();
     }

     async verifyFromAccountBlockedValidation(amount: string) {
        await this.basePageClickElement(this.page.getByTestId('sidebar-link-send-money'));
        await expect(this.page.getByTestId('send-money-frozen-banner')).toBeVisible();
     }
    }