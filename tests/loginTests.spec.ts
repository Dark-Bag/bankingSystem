import {expect, test} from '../src/fixtures/customFixtures';
import {invalidUsers, validUsers} from '../src/data/testData';

test('TC-LOGIN-001: Successfully login as the Admin ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.admin.username, validUsers.admin.password);
   // await page.pause();

});

test('TC-LOGIN-002: Successfully login as the Viewer ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLogin(validUsers.viewer.username, validUsers.viewer.password);
   // await page.pause();

});


test('TC-LOGIN-003: Successfully login as the Admin by pressing Enter ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLoginClickEnter(validUsers.admin.username, validUsers.admin.password);
   // await page.pause();

});

test('TC-LOGIN-004: Successfully login as the Viewer by pressing Enter ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.userLoginClickEnter(validUsers.viewer.username, validUsers.viewer.password);
   // await page.pause();

});




test('TC-LOGIN-005: Failed login as the Admin ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.failedUserLogin(invalidUsers.admin.username, invalidUsers.admin.password);
   // await page.pause();

});

test('TC-LOGIN-006: Failed login as the Viewer ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.failedUserLogin(invalidUsers.viewer.username, invalidUsers.viewer.password);
   // await page.pause();

});

test('TC-LOGIN-007: Toggle password visibility ', async ({page, loginPage}) => {
    await loginPage.basePageGoToUrl('');
    await loginPage.passwordField('TestPassword123!');
   // await page.pause();

});