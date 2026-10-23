

class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');

    this.removeBackpackButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );

    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );

    this.checkoutButton = page.locator(
      '[data-test="checkout"]'
    );
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
