
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

// Test 1: Add one backpack to cart
test('User can add a backpack to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  // Verify that 6 products are displayed
  await expect(products.products).toHaveCount(6);

  // Add backpack to cart
  await products.addBackpackToCart();

  // Verify cart badge count
  await expect(products.cartBadge).toHaveText('1');
});

// Test 2: Add two products and verify cart contents
test('User can add two products to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  // Add two different products
  await products.addBackpackToCart();
  await products.addBikeLightToCart();

  // Verify cart badge count
  await expect(products.cartBadge).toHaveText('2');

  // Open cart page
  await products.openCart();

  // Verify that exactly two items are in the cart
  await expect(page.locator('.cart_item')).toHaveCount(2);

  // Verify both products are visible
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Sauce Labs Bike Light', { exact: true })
  ).toBeVisible();
});
