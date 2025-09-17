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

  async clickCartButton() {
    await this.page.locator(this.locators.cartButton).click();
  }
}


