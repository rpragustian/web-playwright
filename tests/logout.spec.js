import { test, expect } from '@playwright/test';
import {LandingPage} from '../pages/LandingPage.js';
import {MenuPage} from '../pages/MenuPage.js';
import {CartPage} from '../pages/CartPage.js';
import {ProductPage} from '../pages/ProductPage.js';
import {CheckoutCustomerInformation} from '../pages/CheckoutCustomerInformation.js';
import {CheckoutOverview} from '../pages/CheckoutOverview.js';
import {CheckoutStatus} from '../pages/CheckoutStatus.js';

test.describe('Logout Tests on each pages', () => {
  let landingPage;
  let menuPage;
  let cartPage;
  let productPage;
  let checkoutCustomerInformation;
  let checkoutOverview;
  let checkoutStatus;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
    await landingPage.loginWithDefaultCredentials();
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);
    checkoutCustomerInformation = new CheckoutCustomerInformation(page);
    checkoutOverview = new CheckoutOverview(page);
    checkoutStatus = new CheckoutStatus(page);
  });

  test('should logout from landing page', async ({ page }) => {
    // Arrange
    // Act
    await menuPage.clickMenuButton();
    await menuPage.clickLogoutButton();
    
    // Assert
    await landingPage.waitForLoginForm();
    await landingPage.assertLoginFormVisible();
    await landingPage.assertUsernameInputVisible();
    await landingPage.assertPasswordInputVisible();
    await landingPage.assertLoginButtonVisible();
  });

  test('should logout from cart page', async ({ page }) => {

    // Arrange
    const productName = 'Sauce Labs Onesie';



    // Act
    await productPage.addProductToCart(productName);
      await productPage.assertCartBadge(1);
      await productPage.clickCartButton();
      await page.waitForLoadState('networkidle');
      await productPage.assertCartBadge(1);
      await cartPage.assertCartPage(productName);
      await menuPage.clickMenuButton();
      await menuPage.clickLogoutButton();

    // Assert
    await landingPage.waitForLoginForm();
    await landingPage.assertLoginFormVisible();
    await landingPage.assertUsernameInputVisible();
    await landingPage.assertPasswordInputVisible();
    await landingPage.assertLoginButtonVisible();
  })
  
  test('should logout from customer information page', async ({ page }) => {

    // Arrange 
    const productName = 'Sauce Labs Onesie';
    const productPrice = '$7.99';
    const productQuantity = '1';
    const productDescription = 'Rib snap infant onesie for the ';
    const firstName = 'John';
    const lastName = 'Doe';
    const postalCode = '12345';

    // Act
    await productPage.addProductToCart(productName);
    await productPage.assertCartBadge(1);
    await productPage.clickCartButton();
    await page.waitForLoadState('networkidle');

    await productPage.assertCartBadge(1);
    await cartPage.assertCartPage(productName);
    await cartPage.clickCheckoutButton();
    
    await checkoutCustomerInformation.assertPageTitle();
    await checkoutCustomerInformation.fillFirstName(firstName);
    await checkoutCustomerInformation.fillLastName(lastName);
    await checkoutCustomerInformation.fillPostalCode(postalCode);
    await menuPage.clickMenuButton();
    await menuPage.clickLogoutButton();

    // Assert
    await landingPage.waitForLoginForm();
    await landingPage.assertLoginFormVisible();
    await landingPage.assertUsernameInputVisible();
    await landingPage.assertPasswordInputVisible();
    await landingPage.assertLoginButtonVisible();
  })
})