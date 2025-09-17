import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage.js';

test.describe('Login Tests', () => {
  let landingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
  });

  test('should display login form elements', async () => {
    // ARRANGE - Page is already navigated in beforeEach
    // No additional setup needed as we're testing initial page state
    
    // ACT - No action needed, we're testing the initial state
    
    // ASSERT - Verify all login form elements are visible
    await landingPage.assertLoginFormVisible();
    await landingPage.assertUsernameInputVisible();
    await landingPage.assertPasswordInputVisible();
    await landingPage.assertLoginButtonVisible();
  });

  test('should login with valid credentials', async () => {
    // ARRANGE - Set up test data
    const username = 'standard_user';
    const password = 'secret_sauce';
    
    // ACT - Perform login action
    await landingPage.login(username, password);
    
    // ASSERT - Verify successful login redirect
    await landingPage.assertURL(/.*inventory/);
  });

  test('should show error message with invalid credentials', async () => {
    // ARRANGE - Set up invalid test data
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';
    const expectedErrorMessage = 'Epic sadface: Username and password do not match any user in this service';
    
    // ACT - Attempt login with invalid credentials
    await landingPage.login(invalidUsername, invalidPassword);
    
    // ASSERT - Verify error message is displayed
    await landingPage.assertErrorMessage(expectedErrorMessage);
  });

  test('should show error message with empty credentials', async () => {
    // ARRANGE - Set up expected error message
    const expectedErrorMessage = 'Epic sadface: Username is required';
    
    // ACT - Attempt login with empty credentials
    await landingPage.clickLoginButton();
    
    // ASSERT - Verify error message is displayed
    await landingPage.assertErrorMessage(expectedErrorMessage);
  });

  test('should clear form fields', async () => {
    // ARRANGE - Set up test data
    const testUsername = 'test_user';
    const testPassword = 'test_password';
    const expectedEmptyValue = '';
    
    // ACT - Fill fields and then clear them
    await landingPage.fillUsername(testUsername);
    await landingPage.fillPassword(testPassword);
    await landingPage.clearUsername();
    await landingPage.clearPassword();
    
    // ASSERT - Verify fields are empty
    await landingPage.assertUsernameValue(expectedEmptyValue);
    await landingPage.assertPasswordValue(expectedEmptyValue);
  });
});
