
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Valid user should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});
