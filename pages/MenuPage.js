import { expect } from '@playwright/test';
import { MenuLocators } from '../locators/menuLocators.js';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.locators = MenuLocators;
  }

  async clickMenuButton() {
    await this.page.locator(this.locators.menuButton).click();
  }

  async clickLogoutButton() {
    await this.page.locator(this.locators.logoutButton).click();
  }
  
  async clickAllItemsButton() {
    await this.page.locator(this.locators.allItemsButton).click();
  }

  async clickAboutButton() {
    await this.page.locator(this.locators.aboutButton).click();
  }
  
  async clickResetAppStateButton() {
    await this.page.locator(this.locators.resetAppStateButton).click();
  }

  async clickCloseMenuButton() {
    await this.page.locator(this.locators.closeMenuButton).click();
  }
}