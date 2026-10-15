import {expect, test} from '../src/fixtures/customFixtures';
import {invalidUsers, validUsers} from '../src/data/testData';


test('TC-DASH-001: Verify Dashboard Load ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.dashboardWelcomeMessage(); 
   // await page.pause();

});

test('TC-DASH-002: Verify Total Balance ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.verifyTotalBalance(); 
   // await page.pause();

});

test('TC-DASH-003: Verify Recent Transactions ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.verifyRecentTransactions();
   // await page.pause();

});

test('TC-DASH-004: Verify Quick Transfer Links ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.quickTransferLinks();
   // await page.pause();

});

test('TC-DASH-005: Verify Quick Bill Pay Links ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.payBill();
   // await page.pause();

});