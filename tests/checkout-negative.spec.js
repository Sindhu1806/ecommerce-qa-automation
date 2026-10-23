
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

  // Login
  await login.open();
  await login.login('standard_user', 'secret_sauce');

  // Add product and open cart
  await products.addBackpackToCart();
  await products.openCart();

  // Proceed to checkout
  await cart.proceedToCheckout();

  // Leave first name empty
  await checkout.enterCustomerDetails('', 'Reddy', '500001');
  await checkout.continueCheckout();

  // Verify validation error
  await expect(checkout.errorMessage).toBeVisible();
  await expect(checkout.errorMessage).toContainText(
    'First Name is required'
  );
});
