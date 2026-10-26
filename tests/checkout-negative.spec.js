
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Checkout should show error when first name is missing', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await products.addBackpackToCart();
  await products.openCart();
  await cart.proceedToCheckout();

  await checkout.enterCustomerDetails('', 'Reddy', '500001');
  await checkout.continueCheckout();

  await expect(checkout.errorMessage).toBeVisible();
  await expect(checkout.errorMessage).toContainText(
    'First Name is required'
  );
});

test('Checkout should show error when last name is missing', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await products.addBackpackToCart();
  await products.openCart();
  await cart.proceedToCheckout();

  await checkout.enterCustomerDetails('Sindhu', '', '500001');
  await checkout.continueCheckout();

  await expect(checkout.errorMessage).toBeVisible();
  await expect(checkout.errorMessage).toContainText(
    'Last Name is required'
  );
});

test('Checkout should show error when postal code is missing', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await products.addBackpackToCart();
  await products.openCart();
  await cart.proceedToCheckout();

  await checkout.enterCustomerDetails('Sindhu', 'Reddy', '');
  await checkout.continueCheckout();

  await expect(checkout.errorMessage).toBeVisible();
  await expect(checkout.errorMessage).toContainText(
    'Postal Code is required'
  );
});

