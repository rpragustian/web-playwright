import { expect } from '@playwright/test';
import { CartPageLocators } from '../locators/CartPageLocators.js';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.locators = CartPageLocators;
  }

  async assertCartPage(productName) {
    await expect(this.page.locator(this.locators.cartItemName)).toHaveText(productName);
  }

  async removeItemFromCart() {
    await this.page.locator(this.locators.removeButton).click();
  }

  async continueShopping() {
    await this.page.locator(this.locators.continueShoppingButton).click();
  }

  async clickCheckoutButton() {
    await this.page.locator(this.locators.checkoutButton).click();
  }
}
