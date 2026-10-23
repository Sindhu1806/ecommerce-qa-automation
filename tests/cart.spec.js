
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test('User can remove product from cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await products.addBackpackToCart();
  await products.openCart();

  await expect(cart.cartItems).toHaveCount(1);

  await cart.removeBackpack();

  await expect(cart.cartItems).toHaveCount(0);
});
