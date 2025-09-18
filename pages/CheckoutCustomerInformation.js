import { expect } from '@playwright/test';
import { CheckoutCustomerInformationLocators } from '../locators/checkoutCustomerInformation.js';

export class CheckoutCustomerInformation {
  constructor(page) {
    this.page = page;
    this.locators = CheckoutCustomerInformationLocators;
  }

  async assertPageTitle() {
    await expect(this.page.locator(this.locators.title)).toBeVisible();
    await expect(this.page.locator(this.locators.title)).toHaveText('Checkout: Your Information');
  }

  async fillFirstName(firstName) {
    await this.page.locator(this.locators.firstNameInput).fill(firstName);
  }

  async fillLastName(lastName) {
    await this.page.locator(this.locators.lastNameInput).fill(lastName);
  }
  
  async fillPostalCode(postalCode) {
    await this.page.locator(this.locators.postalCodeInput).fill(postalCode);
  }

  async clickContinueButton() {
    await this.page.locator(this.locators.continueButton).click();
  }
  
  async clickCancelButton() {
    await this.page.locator(this.locators.cancelButton).click();
  }

  async assertErrorMessage(errorMessage) {
    await expect(this.page.locator(this.locators.errorMessage)).toHaveText(errorMessage);
  }
}