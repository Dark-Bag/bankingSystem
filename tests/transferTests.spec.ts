import {expect, test} from '../src/fixtures/customFixtures';
import {invalidUsers, randomData, validUsers} from '../src/data/testData';
import { dashboardPage } from '../src/pages/dashboardPage';


test('Verify Transfer Page Load ', async ({page, loginPage, transferPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await transferPage.verifyTransferPage(); 
   // await page.pause();

});

test('Verify Insufficient Funds Validation ', async ({page, loginPage, transferPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await transferPage.verifyInsufficientFundsValidation(randomData.insufficientFunds.amount); 
   // await page.pause();

});

test('Verify Successful Transfer ', async ({page, loginPage, transferPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await transferPage.verifySuccessfulTransfer(randomData.validTransfer.amount); 
   // await page.pause();

});

test('Verify Transfer Balance Update ', async ({page, loginPage, transferPage, dashboardPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);

    const initialCheckingBalanceAmount = await dashboardPage.getCheckingBalance();
    const initialSavingsBalanceAmount = await dashboardPage.getSavingsBalance();
    await transferPage.verifyTransferBalanceUpdate(randomData.validTransfer.amount); 
    const finalCheckingBalanceAmount = await dashboardPage.getCheckingBalance();
    const finalSavingsBalanceAmount = await dashboardPage.getSavingsBalance();
    expect(finalCheckingBalanceAmount).toBe(initialCheckingBalanceAmount - Number(randomData.validTransfer.amount));
    expect(finalSavingsBalanceAmount).toBe(initialSavingsBalanceAmount + Number(randomData.validTransfer.amount));
   // await page.pause();

});