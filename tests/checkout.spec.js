
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('User can complete an order', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await products.addBackpackToCart();
  await products.openCart();
  await cart.proceedToCheckout();

  await checkout.enterCustomerDetails(
    'Sindhu',
    'Reddy',
    '500001'
  );

  await checkout.continueCheckout();

  await expect(page).toHaveURL(/checkout-step-two.html/);

  await checkout.finishOrder();

  await expect(checkout.completeHeader).toHaveText(
    'Thank you for your order!'
  );
});
