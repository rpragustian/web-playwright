import { expect } from '@playwright/test';
import { CheckoutStatusLocators } from '../locators/checkoutStatus.js';

export class CheckoutStatus {
  constructor(page) {
    this.page = page;
    this.locators = CheckoutStatusLocators;
  }

  async assertPageTitle() {
    await expect(this.page.locator(this.locators.title)).toBeVisible();
    await expect(this.page.locator(this.locators.title)).toHaveText('Checkout: Complete!');
  }

  async assertCompleteOrderStatus() {
    await expect(this.page.locator(this.locators.completeOrderStatus)).toBeVisible();
    await expect(this.page.locator(this.locators.completeOrderStatus)).toHaveText('Thank you for your order!');
  }
  
  async assertCompleteOrderText() {
    await expect(this.page.locator(this.locators.completeOrderText)).toBeVisible();
    await expect(this.page.locator(this.locators.completeOrderText)).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }

  async clickBackHomeButton() {
    await this.page.locator(this.locators.backHomeButton).click();
  }
}