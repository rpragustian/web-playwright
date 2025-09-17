import { expect } from '@playwright/test';
import { CheckoutOverviewLocators } from '../locators/checkoutOverview.js';

export class CheckoutOverview {
  constructor(page) {
    this.page = page;
    this.locators = CheckoutOverviewLocators;
  }

  async assertPageTitle() {
    await expect(this.page.locator(this.locators.title)).toBeVisible();
    await expect(this.page.locator(this.locators.title)).toHaveText('Checkout: Overview');
  }

  async assertItemProductName(productName) {
    await expect(this.page.locator(this.locators.itemProductName)).toHaveText(productName);
  }

  async assertItemProductPrice(productPrice) {
    await expect(this.page.locator(this.locators.itemProductPrice)).toHaveText(productPrice);
  }

  async assertItemProductQuantity(productQuantity) {
    await expect(this.page.locator(this.locators.itemProductQuantity)).toHaveText(productQuantity);
  }

  async assertItemProductDescription(productDescription) {
    await expect(this.page.locator(this.locators.itemProductDescription)).toContainText(productDescription);
  }

  async assertPaymentInfoLabel() {
    await expect(this.page.locator(this.locators.paymentInfoLabel)).toBeVisible();
  }

  async assertPaymentInfoValue() {
    await expect(this.page.locator(this.locators.paymentInfoValue)).toBeVisible();
  }

  async assertShippingInfoLabel() {
    await expect(this.page.locator(this.locators.shippingInfoLabel)).toBeVisible();
  }

  async assertItemTotalLabel() {
    await expect(this.page.locator(this.locators.itemTotalLabel)).toBeVisible();
  }

  async assertSubTotalLabel() {
    await expect(this.page.locator(this.locators.subTotalLabel)).toBeVisible();
  }

  async assertTaxLabel() {
    await expect(this.page.locator(this.locators.taxLabel)).toBeVisible();
  }

  async assertTotalLabel() {
    await expect(this.page.locator(this.locators.totalLabel)).toBeVisible();
  }

  async clickFinishButton() {
    await this.page.locator(this.locators.finishButton).click();
  }

  async clickCancelButton() {
    await this.page.locator(this.locators.cancelButton).click();
  }
}