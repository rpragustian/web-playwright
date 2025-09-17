import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test.describe('Add to Cart Tests', () => {
  let landingPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
    await landingPage.loginWithDefaultCredentials();
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
  });

  test('should add products to cart one by one', async ({ page }) => {
    // Arrange
    const products = [
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];
    
    // Test each product individually
    for (const productName of products) {
      // Act
      await productPage.addProductToCart(productName);
      await productPage.assertCartBadge(1);
      await productPage.clickCartButton();
      await page.waitForLoadState('networkidle');
      
      // Assert
      await productPage.assertCartBadge(1);
      await cartPage.assertCartPage(productName);
      
      // Remove item from cart and go back to products page for next iteration
      await cartPage.removeItemFromCart();
      await cartPage.continueShopping();
      await page.waitForLoadState('networkidle');
    }
  });

  test('should add multiple products to the cart', async ({ page }) => {
    // Arrange
    const products = [
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];

    // Act
    for (const productName of products) {
      await productPage.addProductToCart(productName);
    }
    await productPage.clickCartButton();
    await page.waitForLoadState('networkidle');

    // Assert
    await productPage.assertCartBadge(products.length);
    await cartPage.assertCartPage(products);
  });

  test('should add a product to the cart and remove it from cart page', async ({ page }) => {
    // Arrange
    const productName = 'Sauce Labs Onesie';

    // Act
    await productPage.addProductToCart(productName);
    await productPage.clickCartButton();
    await page.waitForLoadState('networkidle');
    await cartPage.removeItemFromCart();
    await cartPage.continueShopping();
    await page.waitForLoadState('networkidle');

    // Assert
    await productPage.assertCartBadgeNotDisplayed();
  });

  test('should add a product to the cart and remove it from product page', async ({ page }) => {
    // Arrange
    const productName = 'Sauce Labs Onesie';

    // Act
    await productPage.addProductToCart(productName);
    await productPage.assertCartBadge(1);
    await productPage.removeItemFromProductPage(productName);

    // Assert
    await productPage.assertCartBadgeNotDisplayed();
  });
});