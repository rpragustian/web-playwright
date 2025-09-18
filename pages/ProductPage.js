import { expect } from '@playwright/test';
import { ProductPageLocators } from '../locators/ProductPageLocators.js';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.locators = ProductPageLocators;
  }

  async addProductToCart(productName) {
    await this.page.locator(this.locators.getProductByName(productName)).click();
  }

  async assertCartBadge(expectedCount) {
    await expect(this.page.locator(this.locators.cartBadge)).toHaveText(expectedCount.toString());
  }

  async removeItemFromProductPage(productName) {
    await this.page.locator(this.locators.removeProductByName(productName)).click();
  }

  async assertCartBadgeNotDisplayed() {
    await expect(this.page.locator(this.locators.cartBadge)).not.toBeVisible();
  }

  async clickCartButton() {
    await this.page.locator(this.locators.cartButton).click();
  }

  async getProductNameByIndex(index) {
    return await this.page.locator(this.locators.productName).nth(index).textContent();
  }

  async getProductPriceByIndex(index) {
    return await this.page.locator(this.locators.productPrice).nth(index).textContent();
  }

  async filterProducts(filterOption) {
    let filterValue = filterOption.toLowerCase();

    switch (filterValue) {
      case 'name (a to z)':
        await this.page.locator(this.locators.productSort).selectOption('az');
        break;
      case 'name (z to a)':
        await this.page.locator(this.locators.productSort).selectOption('za');
        break;
      case 'price (low to high)':
        await this.page.locator(this.locators.productSort).selectOption('lohi');
        break;
      case 'price (high to low)':
        await this.page.locator(this.locators.productSort).selectOption('hilo');
        break;
      default:
        throw new Error(`Invalid filter option: ${filterOption}`);
    }
  }

  async assertProductNameByIndex(index, productName) {
    await expect(this.page.locator(this.locators.productName).nth(index)).toHaveText(productName);
  }

  async assertProductPriceByIndex(index, productPrice) {
    await expect(this.page.locator(this.locators.productPrice).nth(index)).toHaveText(productPrice);
  }
}


