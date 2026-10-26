
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

  // Step 1: Open website and login
  await login.open();
  await login.login('standard_user', 'secret_sauce');

  // Step 2: Add backpack to cart
  await products.addBackpackToCart();

  // Step 3: Open cart and proceed to checkout
  await products.openCart();
  await cart.proceedToCheckout();

  // Step 4: Enter customer details
  await checkout.enterCustomerDetails(
    'Sindhu',
    'Reddy',
    '500001'
  );

  // Step 5: Continue to checkout overview
  await checkout.continueCheckout();

  // Step 6: Verify checkout overview URL
  await expect(page).toHaveURL(/checkout-step-two.html/);

  // Step 7: Verify the correct product is displayed
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  // Step 8: Finish the order
  await checkout.finishOrder();

  // Step 9: Verify successful order confirmation
  await expect(checkout.completeHeader).toHaveText(
    'Thank you for your order!'
  );
});
