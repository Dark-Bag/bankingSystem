import {expect, test} from '../src/fixtures/customFixtures';
import {invalidUsers, validUsers} from '../src/data/testData';


test('Verify Dashboard Load ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.dashboardWelcomeMessage(); 
   // await page.pause();

});

test('Verify Total Balance ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.verifyTotalBalance(); 
   // await page.pause();

});

test('Verify Recent Transactions ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.verifyRecentTransactions();
   // await page.pause();

});

test('Verify Quick Transfer Links ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.quickTransferLinks();
   // await page.pause();

});

test('Verify Quick Bill Pay Links ', async ({page, loginPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await dashboardPage.payBill();
   // await page.pause();

});