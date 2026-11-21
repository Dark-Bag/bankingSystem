import { expect } from '@playwright/test';
import { basePage } from '../base/basePage';

export class loginPage extends basePage {
    private readonly usernameInput = this.page.getByTestId('login-username-input');
    private readonly passwordInput = this.page.getByTestId('login-password-input');
    private readonly signInButton = this.page.getByTestId('login-submit-btn');
    private readonly errorMessage = this.page.getByTestId('login-error-message');

    private readonly invalidCredentialsMessage =
        'The username or password you entered is incorrect.';

    async openBankPage() {
        await this.basePageGoToUrl('/');
    }

    async navigateToLoginPage() {
        await this.page.getByText('Bank Demo').click();
        await expect(this.usernameInput).toBeVisible();
    }

    async userLogin(username: string, password: string) {
        await this.basePageEnterText(this.usernameInput, username);
        await this.basePageEnterText(this.passwordInput, password);
        await this.basePageClickElement(this.signInButton);
    }

    async userLoginClickEnter(username: string, password: string) {
        await this.basePageEnterText(this.usernameInput, username);
        await this.basePageEnterText(this.passwordInput, password);
        await this.passwordInput.press('Enter');
    }

    async failedUserLogin(username: string, password: string) {
        await this.userLogin(username, password);
        await this.verifyLoginError(this.invalidCredentialsMessage);
    }

    async verifyLoginError(message: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    }

    async getLoginErrorMessage(): Promise<string> {
        await expect(this.errorMessage).toBeVisible();
        return (await this.errorMessage.innerText()).trim();
    }

    async verifySuccessfulLogin() {
        await expect(this.page).toHaveURL(/\/bank\/dashboard\/?$/);
    }

    async verifyEmptyUsernameAndPassword() {
        await this.basePageClickElement(this.signInButton);
        await this.verifyLoginError('Please enter your username.');
    }

    async verifyEmptyPassword(username: string) {
        await this.basePageEnterText(this.usernameInput, username);
        await this.basePageClickElement(this.signInButton);
        await this.verifyLoginError('Please enter your password.');
    }

    async verifyUsernameWhitespace(username: string, password: string) {
        await this.userLogin(`  ${username}  `, password);
        await this.verifySuccessfulLogin();
    }

    async verifyPasswordWhitespace(username: string, password: string) {
        await this.userLogin(username, `  ${password}  `);
        await this.verifyLoginError(this.invalidCredentialsMessage);
    }

    async passwordField(password: string) {
        await this.basePageEnterText(this.passwordInput, password);

        await expect(this.passwordInput).toHaveAttribute('type', 'password');

        await this.page.getByRole('button', { name: 'Show password' }).click();
        await expect(this.passwordInput).toHaveAttribute('type', 'text');

        await this.page.getByRole('button', { name: 'Hide password' }).click();
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }

    async verifyPasswordStartsMasked(password: string) {
        await this.basePageEnterText(this.passwordInput, password);
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }

    async verifyPasswordCanBeShown(password: string) {
        await this.basePageEnterText(this.passwordInput, password);
        await this.page.getByRole('button', { name: 'Show password' }).click();
        await expect(this.passwordInput).toHaveAttribute('type', 'text');
    }

    async verifyAuthenticatedSessionRefresh() {
        await this.page.reload();
        await this.verifySuccessfulLogin();
        await expect(this.page.getByRole('button', { name: 'Logout' })).toBeVisible();
    }

    async verifyAuthenticatedLoginRedirect() {
        await this.basePageGoToUrl('/login');
        await this.verifySuccessfulLogin();
    }

    async logoutAndVerifyBackNavigation() {
        await this.page.getByRole('button', { name: 'Logout' }).click();

        await expect(this.page).toHaveURL(/\/bank\/login\/?$/);
        await this.page.goBack();

        await expect(this.page).toHaveURL(/\/bank\/login\/?$/);
        await expect(this.signInButton).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Logout' })).toHaveCount(0);
    }

    async verifyRepeatedFailedLogins(username: string, password: string) {
        for (let attempt = 0; attempt < 3; attempt++) {
            await this.failedUserLogin(username, password);
        }
    }

    async verifyFrozenAccountNotice() {
        await expect(
            this.page.getByText(
                'Account Frozen: Money movement actions are disabled while your account is frozen. Please contact support.'
            )
        ).toBeVisible();
    }
}
