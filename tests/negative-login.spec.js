
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const invalidLoginCases = [
  {
    name: 'Wrong password',
    username: 'standard_user',
    password: 'wrong123',
    expectedError: 'Username and password do not match',
  },
  {
    name: 'Wrong username',
    username: 'wrong_user',
    password: 'secret_sauce',
    expectedError: 'Username and password do not match',
  },
  {
    name: 'Both username and password are wrong',
    username: 'wrong_user',
    password: 'wrong123',
    expectedError: 'Username and password do not match',
  },
  {
    name: 'Empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Username is required',
  },
  {
    name: 'Empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Password is required',
  },
  {
    name: 'Both fields are empty',
    username: '',
    password: '',
    expectedError: 'Username is required',
  },
  {
    name: 'Special characters in both fields',
    username: '@@@###',
    password: '!!$$%%',
    expectedError: 'Username and password do not match',
  },
  {
    name: 'Username containing a space',
    username: 'wrong user',
    password: 'secret_sauce',
    expectedError: 'Username and password do not match',
  },
];

for (const loginCase of invalidLoginCases) {
  test(`Negative login: ${loginCase.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(loginCase.username, loginCase.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      loginCase.expectedError
    );
  });
}
