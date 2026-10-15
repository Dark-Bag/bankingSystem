import {test as base } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { dashboardPage } from '../pages/dashboardPage';
import { accountsPage } from '../pages/accountsPage';
import { transferPage } from '../pages/transferPage';
import { sendMoneyPage } from '../pages/sendMoney';


type CustomFixtures = {
    loginPage: loginPage;
    dashboardPage: dashboardPage;
    accountsPage: accountsPage;
    transferPage: transferPage;
    sendMoneyPage: sendMoneyPage;
};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new loginPage(page));
    },
    
    dashboardPage: async ({ page }, use) => {
        await use(new dashboardPage(page));
    },

    accountsPage: async ({ page }, use) => {
        await use(new accountsPage(page));
    },

     transferPage: async ({ page }, use) => {
        await use(new transferPage(page));
    },
    sendMoneyPage: async ({ page }, use) => {
        await use(new sendMoneyPage(page));
    }

});

export { expect } from '@playwright/test';