
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

// Test 1: Remove the only product from cart
test('User can remove product from cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  // Add backpack to cart
  await products.addBackpackToCart();
  await expect(products.cartBadge).toHaveText('1');

  // Open cart and verify item count
  await products.openCart();
  await expect(cart.cartItems).toHaveCount(1);

  // Remove backpack
  await cart.removeBackpack();

  // Verify cart is empty and badge is hidden
  await expect(cart.cartItems).toHaveCount(0);
  await expect(products.cartBadge).toBeHidden();
});

// Test 2: Remove one product when two products are in cart
test('Removing one of two products updates cart correctly', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  // Add two products
  await products.addBackpackToCart();
  await products.addBikeLightToCart();

  // Verify cart badge count
  await expect(products.cartBadge).toHaveText('2');

  // Open cart and verify two items
  await products.openCart();
  await expect(cart.cartItems).toHaveCount(2);

  // Remove backpack
  await cart.removeBackpack();

  // Verify one item remains
  await expect(cart.cartItems).toHaveCount(1);
  await expect(products.cartBadge).toHaveText('1');

  // Verify Bike Light remains in cart
  await expect(
    page.getByText('Sauce Labs Bike Light', { exact: true })
  ).toBeVisible();

  // Verify Backpack is removed
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toHaveCount(0);
});

