import {test as base } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { dashboardPage } from '../pages/dashboardPage';
import { accountsPage } from '../pages/accountsPage';


type CustomFixtures = {
    loginPage: loginPage;
    dashboardPage: dashboardPage;
    accountsPage: accountsPage;

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

});

export { expect } from '@playwright/test';