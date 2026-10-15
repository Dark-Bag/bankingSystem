import {expect, test} from '../src/fixtures/customFixtures';
import {invalidUsers, randomData, validUsers} from '../src/data/testData';

test('TC-SEND-001: Verify Send Money Form Load ', async ({page, loginPage, sendMoneyPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await sendMoneyPage.verifySendPage();
});

test('TC-SEND-002: 	Verify Add New Payee Validation ', async ({page, loginPage, sendMoneyPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await sendMoneyPage.verifyAddNewPayeeValidation(randomData.userDetails.fullName, 
        randomData.bankDetails.bankName, randomData.bankDetails.invalidRoutingNumber, 
        randomData.bankDetails.accountNumber);
});

test('TC-SEND-003: 	Verify Successful Send Money ', async ({page, loginPage, sendMoneyPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await sendMoneyPage.verifySuccessfullySentMoney(randomData.validTransfer.amount);
});

test('TC-SEND-004: 	Verify Save Payee Functionality ', async ({page, loginPage, sendMoneyPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await sendMoneyPage.verifySuccessfullySavePayeeAndSendMoney(randomData.userDetails.fullName, 
        randomData.bankDetails.bankName, randomData.bankDetails.validRoutingNumber, 
        randomData.bankDetails.accountNumber, randomData.validTransfer.amount);
});

test('TC-SEND-005: 	Verify Insufficient Funds Validation ', async ({page, loginPage, sendMoneyPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
    await sendMoneyPage.verifyInsufficientFundsValidation(randomData.insufficientFunds.amount);
});

test('TC-SEND-001: Verify Frozen Account Block ', async ({page, loginPage, sendMoneyPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.frozen.username, validUsers.frozen.password);
    await sendMoneyPage.verifySendPage();
});

