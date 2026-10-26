
class ProductsPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.inventory_item');

    this.addBackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );

    this.addBikeLightButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    );

    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async addBikeLightToCart() {
    await this.addBikeLightButton.click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}

module.exports = { ProductsPage };
