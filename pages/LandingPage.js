import { expect } from '@playwright/test';
import { LandingPageLocators } from '../locators/LandingPageLocators.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class LandingPage {
  constructor(page) {
    this.page = page;
    this.locators = LandingPageLocators;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to the landing page
   */
  async navigate() {
    await this.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
    await this.waitForPageLoad();
  }

  /**
   * Perform login with username and password
   * @param {string} username - Username to login with
   * @param {string} password - Password to login with
   */
  async login(username, password) {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  /**
   * Perform login with default credentials from environment
   */
  async loginWithDefaultCredentials() {
    const username = process.env.USERNAME || 'standard_user';
    const password = process.env.PASSWORD || 'secret_sauce';
    await this.login(username, password);
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<boolean>} True if element is visible
   */
  async isElementVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector or locator
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Click on an element
   * @param {string} selector - CSS selector or locator
   */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Fill input field
   * @param {string} selector - CSS selector or locator
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Get text content of an element
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<string>} Text content
   */
  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if login form is visible
   * @returns {Promise<boolean>} True if login form is visible
   */
  async isLoginFormVisible() {
    return await this.isElementVisible(this.locators.loginContainer);
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.isElementVisible(this.locators.errorMessage);
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    return await this.getText(this.locators.errorMessage);
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    await this.page.locator(this.locators.usernameInput).clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.page.locator(this.locators.passwordInput).clear();
  }

  /**
   * Check if bot image is visible
   * @returns {Promise<boolean>} True if bot image is visible
   */
  async isBotImageVisible() {
    return await this.isElementVisible(this.locators.botImage);
  }

  /**
   * Check if logo is visible
   * @returns {Promise<boolean>} True if logo is visible
   */
  async isLogoVisible() {
    return await this.isElementVisible(this.locators.logo);
  }

  /**
   * Assert page title contains text
   * @param {string} expectedTitle - Expected title text
   */
  async assertTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
  }

  /**
   * Assert element is visible
   * @param {string} selector - CSS selector or locator
   */
  async assertElementVisible(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Assert element contains text
   * @param {string} selector - CSS selector or locator
   * @param {string} expectedText - Expected text
   */
  async assertElementText(selector, expectedText) {
    await expect(this.page.locator(selector)).toContainText(expectedText);
  }

  /**
   * Assert input field has specific value
   * @param {string} selector - CSS selector or locator
   * @param {string} expectedValue - Expected value
   */
  async assertFieldValue(selector, expectedValue) {
    await expect(this.page.locator(selector)).toHaveValue(expectedValue);
  }

  /**
   * Assert page title is correct
   */
  async assertPageTitle() {
    await this.assertTitle('Swag Labs');
  }

  /**
   * Assert login form is visible
   */
  async assertLoginFormVisible() {
    await this.assertElementVisible(this.locators.loginContainer);
  }

  /**
   * Assert username input is visible
   */
  async assertUsernameInputVisible() {
    await this.assertElementVisible(this.locators.usernameInput);
  }

  /**
   * Assert password input is visible
   */
  async assertPasswordInputVisible() {
    await this.assertElementVisible(this.locators.passwordInput);
  }

  /**
   * Assert login button is visible
   */
  async assertLoginButtonVisible() {
    await this.assertElementVisible(this.locators.loginButton);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.click(this.locators.loginButton);
  }

  /**
   * Fill username field
   * @param {string} username - Username to fill
   */
  async fillUsername(username) {
    await this.fill(this.locators.usernameInput, username);
  }

  /**
   * Fill password field
   * @param {string} password - Password to fill
   */
  async fillPassword(password) {
    await this.fill(this.locators.passwordInput, password);
  }

  /**
   * Assert username field has specific value
   * @param {string} expectedValue - Expected value
   */
  async assertUsernameValue(expectedValue) {
    await this.assertFieldValue(this.locators.usernameInput, expectedValue);
  }

  /**
   * Assert password field has specific value
   * @param {string} expectedValue - Expected value
   */
  async assertPasswordValue(expectedValue) {
    await this.assertFieldValue(this.locators.passwordInput, expectedValue);
  }

  /**
   * Assert page URL contains specific text
   * @param {string|RegExp} urlPattern - URL pattern to match
   */
  async assertURL(urlPattern) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  /**
   * Assert error message is displayed
   * @param {string} expectedMessage - Expected error message
   */
  async assertErrorMessage(expectedMessage) {
    await this.assertElementVisible(this.locators.errorMessage);
    await this.assertElementText(this.locators.errorMessage, expectedMessage);
  }

  /**
   * Wait for login form to be visible
   */
  async waitForLoginForm() {
    await this.waitForElement(this.locators.loginContainer);
  }
}
