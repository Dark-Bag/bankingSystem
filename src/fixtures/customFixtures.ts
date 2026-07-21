import {test as base } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { dashboardPage } from '../pages/dashboardPage';
import { accountsPage } from '../pages/accountsPage';
import { transferPage } from '../pages/transferPage';


type CustomFixtures = {
    loginPage: loginPage;
    dashboardPage: dashboardPage;
    accountsPage: accountsPage;
    transferPage: transferPage;
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

});

export { expect } from '@playwright/test';