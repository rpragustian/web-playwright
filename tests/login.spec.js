import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage.js';
import { MenuPage } from '../pages/MenuPage.js';

test.describe('Login Tests', () => {
  let landingPage;
  let menuPage;
  
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
    menuPage = new MenuPage(page);
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

  test('should login with valid credentials @smoke', async () => {
    // ARRANGE - Set up test data (username in code, password from env)
    const username = 'standard_user';
    const password = process.env.TEST_PASSWORD;
    
    // ACT - Perform login action
    await landingPage.login(username, password);
    
    // ASSERT - Verify successful login redirect
    await landingPage.assertURL(/.*inventory/);
  });

  test('should login with locked out user', async () => {
    // ARRANGE - Set up test data (username in code, password from env)
    const username = 'locked_out_user';
    const password = process.env.TEST_PASSWORD;
    const expectedErrorMessage = 'Epic sadface: Sorry, this user has been locked out.';
    
    // ACT - Perform login action
    await landingPage.login(username, password);
    
    // ASSERT - Verify error message
    await landingPage.assertErrorMessage(expectedErrorMessage);
  });

  test('should login with multiple usernames and passwords', async () => {
    // ARRANGE - Set up test data (usernames in code, password from env)
    const usernames = ['standard_user', 'problem_user', 'performance_glitch_user'];
    const password = process.env.TEST_PASSWORD;
    
    // ACT - Perform login action for each user
    for (const username of usernames) {
      await landingPage.login(username, password);
      
      // ASSERT - Verify successful login redirect
      await landingPage.assertURL(/.*inventory/);
      
      // Clean up - logout before next iteration
      await menuPage.clickMenuButton();
      await menuPage.clickLogoutButton();
    }
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