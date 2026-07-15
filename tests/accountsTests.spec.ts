import {expect, test} from '../src/fixtures/customFixtures';
import {randomData, validUsers} from '../src/data/testData';
import { accountsPage } from '../src/pages/accountsPage';

test('Verify Accounts List Load ', async ({page, loginPage, accountsPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await accountsPage.verifyAccountsPage(); 
   // await page.pause();

});

test('Verify Account Details Display ', async ({page, loginPage, accountsPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await accountsPage.verifyAccountDetails(); 
   // await page.pause();

});

test('Verify Overdraft Banner ', async ({page, loginPage, accountsPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.overdraft.username, validUsers.overdraft.password);
    await accountsPage.verifyOverdraftBanner(); 
   // await page.pause();

});

test('Verify Frozen Account Alert ', async ({page, loginPage, accountsPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.frozen.username, validUsers.frozen.password);
    await accountsPage.verifyFrozenBanner(); 
   // await page.pause();

});

test('Verify Add Account Functionality ', async ({page, loginPage, accountsPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await accountsPage.verifyAddAccountFunctionality(randomData.validTransfer.amount, randomData.validTransfer.amount); 
   // await page.pause();

});


