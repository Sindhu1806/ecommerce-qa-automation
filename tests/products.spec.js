

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test('User can add a backpack to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await expect(products.products).toHaveCount(6);

  await products.addBackpackToCart();

  await expect(products.cartBadge).toHaveText('1');
});
