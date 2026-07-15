import {Locator, expect} from '@playwright/test';
import { basePage } from '../base/basePage';

export class loginPage extends basePage {

    async openBankPage() {
        await this.basePageGoToUrl('/');

    }

    async navigateToLoginPage() {
        await this.page.getByText('Bank Demo').click();
        await expect(this.page.locator('#login-username')).toBeVisible();
    }

    async userLogin(username: string, password: string) {
        await this.basePageEnterText(this.page.locator('#login-username'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(this.page.getByTestId('login-submit-btn'));
    }

    async userLoginClickEnter(username: string, password: string) {
        await this.basePageEnterText(this.page.locator('#login-username'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        const passwordField = this.page.locator('#login-password');
        await passwordField.press('Enter');
    }
        

    async failedUserLogin(username: string, password: string) {
        await this.basePageEnterText(this.page.locator('#login-username'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(this.page.getByTestId('login-submit-btn'));
        await expect(this.page.locator('[data-testid="login-error-message"]')).toBeVisible();
    }

    async passwordField(password: string) {
        const passwordField = this.page.locator('#login-password');
        await this.basePageEnterText(passwordField, password);
        await expect(passwordField).toHaveAttribute('type', 'password');
        await this.basePageClickElement(this.page.locator('[aria-label="Show password"]'));
        await expect(passwordField).toHaveAttribute('type', 'text');
        await this.basePageClickElement(this.page.locator('[aria-label="Hide password"]'));
        await expect(passwordField).toHaveAttribute('type', 'password');
       
    }
       

}