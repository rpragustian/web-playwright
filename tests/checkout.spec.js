import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutCustomerInformation } from '../pages/CheckoutCustomerInformation.js';
import { CheckoutOverview } from '../pages/checkoutOverview.js';
import { CheckoutStatus } from '../pages/checkoutStatus.js';

test.describe('Checkout Tests', () => {
  let landingPage;
  let productPage;
  let cartPage;
  let checkoutCustomerInformation;
  let checkoutOverview;
  let checkoutStatus;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
    await landingPage.loginWithDefaultCredentials();
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutCustomerInformation = new CheckoutCustomerInformation(page);
    checkoutOverview = new CheckoutOverview(page);
    checkoutStatus = new CheckoutStatus(page);
  });

  test('should complete checkout process', async ({ page }) => {
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
    await checkoutCustomerInformation.clickContinueButton();

    await page.waitForLoadState('networkidle');
    await checkoutOverview.assertItemProductName(productName);
    await checkoutOverview.assertItemProductPrice(productPrice);
    await checkoutOverview.assertItemProductQuantity(productQuantity);
    await checkoutOverview.assertItemProductDescription(productDescription);
    await checkoutOverview.assertPaymentInfoLabel();
    await checkoutOverview.assertPaymentInfoValue();
    await checkoutOverview.assertShippingInfoLabel();
    await checkoutOverview.assertItemTotalLabel();
    await checkoutOverview.assertSubTotalLabel();
    await checkoutOverview.assertTaxLabel();
    await checkoutOverview.assertTotalLabel();
    await checkoutOverview.clickFinishButton();

    // Assert
    await page.waitForLoadState('networkidle');
    await checkoutStatus.assertPageTitle();
    await checkoutStatus.assertCompleteOrderStatus();
    await checkoutStatus.assertCompleteOrderText();
    await checkoutStatus.clickBackHomeButton();
    await page.waitForLoadState('networkidle');
    await productPage.assertCartBadgeNotDisplayed();
  });

  test('should display error message when first name is empty', async ({ page }) => {
        // Arrange 
        const productName = 'Sauce Labs Onesie';
        const firstName = '';
        const lastName = 'Doe';
        const postalCode = '12345';
        const expectedErrorMessage = 'Error: First Name is required';
    
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
        await checkoutCustomerInformation.clickContinueButton();

        // Assert
        await checkoutCustomerInformation.assertErrorMessage(expectedErrorMessage);
  });

  test('should display error message when last name is empty', async ({ page }) => {
    // Arrange 
    const productName = 'Sauce Labs Onesie';
    const firstName = 'John';
    const lastName = '';
    const postalCode = '12345';
    const expectedErrorMessage = 'Error: Last Name is required';

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
    await checkoutCustomerInformation.clickContinueButton();

    // Assert
    await checkoutCustomerInformation.assertErrorMessage(expectedErrorMessage);
});

test('should display error message when postal code is empty', async ({ page }) => {
    // Arrange 
    const productName = 'Sauce Labs Onesie';
    const firstName = 'John';
    const lastName = 'Doe';
    const postalCode = '';
    const expectedErrorMessage = 'Error: Postal Code is required';

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
    await checkoutCustomerInformation.clickContinueButton();

    // Assert
    await checkoutCustomerInformation.assertErrorMessage(expectedErrorMessage);
});

test('should display error message when all required fields are empty', async ({ page }) => {
    // Arrange 
    const productName = 'Sauce Labs Onesie';
    const firstName = '';
    const lastName = '';
    const postalCode = '';
    const expectedErrorMessage = 'Error: First Name is required';

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
    await checkoutCustomerInformation.clickContinueButton();

    // Assert
    await checkoutCustomerInformation.assertErrorMessage(expectedErrorMessage);
});
});