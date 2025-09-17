# Playwright Test Automation Framework

This project uses Playwright for end-to-end testing with a Page Object Model (POM) pattern, separated locators structure, and environment configuration. The framework is designed to test the SauceDemo application with clean, maintainable, and scalable test automation.

## Project Structure

```
├── config/                       # Configuration files
├── locators/                     # Page element locators
│   ├── index.js                  # Central export point for all locators
│   ├── LandingPageLocators.js    # Landing page selectors
│   ├── ProductPageLocators.js    # Product page selectors
│   └── CartPageLocators.js       # Cart page selectors
├── pages/                        # Page Object Model classes
│   ├── LandingPage.js            # Landing page object with methods
│   ├── ProductPage.js            # Product page object with methods
│   └── CartPage.js               # Cart page object with methods
├── tests/                        # Test specifications
│   ├── login.spec.js             # Login functionality tests
│   └── addToCart.spec.js         # Add to cart functionality tests
├── playwright-report/            # HTML test reports (generated)
├── test-results/                 # Test execution results (generated)
├── .env                          # Environment variables (create manually)
├── playwright.config.js          # Playwright configuration
└── package.json                  # Dependencies and scripts
```

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Create environment file:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   BASE_URL=https://www.saucedemo.com
   USERNAME=standard_user
   PASSWORD=secret_sauce
   TIMEOUT=30000
   SLOW_MO=100
   ```

4. **Verify setup:**
   ```bash
   npm test
   ```

## Running Tests

### Basic Commands
- **Run all tests:** `npm test`
- **Run tests in headed mode:** `npm run test:headed`
- **Run tests with debug mode:** `npm run test:debug`
- **Run tests with UI mode:** `npm run test:ui`
- **View test report:** `npm run test:report`

### Browser-Specific Testing
- **Run tests in Chromium:** `npm run test:chromium`
- **Run tests in Firefox:** `npm run test:firefox`
- **Run tests in WebKit:** `npm run test:webkit`

### Advanced Options
- **Run specific test file:** `npx playwright test tests/login.spec.js`
- **Run add to cart tests:** `npx playwright test tests/addToCart.spec.js`
- **Run tests with specific browser:** `npx playwright test --project=chromium`
- **Run tests in headed mode:** `npx playwright test --headed`
- **Generate and view report:** `npx playwright show-report`

## Architecture Overview

The framework uses a clean separation of concerns with three main components:

### 1. **Locators** (`/locators/`)
- **LandingPageLocators.js**: Contains all CSS selectors for the landing page
- **ProductPageLocators.js**: Contains selectors for product page elements
- **CartPageLocators.js**: Contains selectors for cart page elements
- **Benefits**: Easy maintenance, reusability, clear separation

### 2. **Page Objects** (`/pages/`)
- **LandingPage.js**: Contains login and navigation methods
- **ProductPage.js**: Contains product interaction methods
- **CartPage.js**: Contains cart verification and management methods
- **Clean methods**: Focus on actions and assertions

### 3. **Environment Configuration**
- **Direct dotenv usage**: Environment variables loaded directly from `.env` file
- **Default values**: Fallback values provided in code when environment variables are not set
- **Easy extension**: Add new environment variables to `.env` file

## Current Test Coverage

### Login Tests (`tests/login.spec.js`)
- ✅ **Login form elements visibility** - Verifies all form elements are displayed
- ✅ **Valid credentials login** - Tests successful login with correct credentials
- ✅ **Invalid credentials error handling** - Tests error message for wrong credentials
- ✅ **Empty credentials validation** - Tests error message for empty fields
- ✅ **Form field clearing functionality** - Tests ability to clear input fields

### Add to Cart Tests (`tests/addToCart.spec.js`)
- ✅ **Multiple product testing** - Tests adding different products to cart
- ✅ **Cart badge verification** - Verifies cart count updates correctly
- ✅ **Cart page navigation** - Tests navigation to cart page
- ✅ **Product verification in cart** - Confirms products appear in cart
- ✅ **Cart management** - Tests removing items and continuing shopping

### Test Structure
The tests follow the **AAA pattern** (Arrange, Act, Assert):
- **Arrange**: Set up test data and initial state
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome

### Example Test Flow
```javascript
test('should add products to cart one by one', async ({ page }) => {
  // ARRANGE - Set up test data
  const products = [
    'Sauce Labs Onesie',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ];
  
  // ACT - Perform actions for each product
  for (const productName of products) {
    await productPage.addProductToCart(productName);
    await productPage.clickCartButton();
    
    // ASSERT - Verify expected outcomes
    await productPage.assertCartBadge(1);
    await cartPage.assertCartPage(productName);
    
    // Clean up for next iteration
    await cartPage.removeItemFromCart();
    await cartPage.continueShopping();
  }
});
```

## Page Object Model Implementation

### ProductPage Methods
- `addProductToCart(productName)` - Adds a specific product to cart
- `assertCartBadge(expectedCount)` - Verifies cart badge count
- `clickCartButton()` - Navigates to cart page

### CartPage Methods
- `assertCartPage(productName)` - Verifies product is in cart
- `removeItemFromCart()` - Removes item from cart
- `continueShopping()` - Returns to products page

### LandingPage Methods
- `navigate()` - Navigates to application
- `loginWithDefaultCredentials()` - Performs login with default credentials
- `login(username, password)` - Performs login with custom credentials

## Configuration Details

### Playwright Configuration (`playwright.config.js`)
- **Base URL**: SauceDemo application (https://www.saucedemo.com)
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled for faster test runs
- **Retries**: 2 retries in CI, 0 locally
- **Timeouts**: 30 seconds for actions and navigation
- **Slow Motion**: 100ms delay between actions (configurable)
- **Tracing**: Enabled on first retry for debugging
- **Reporting**: HTML reports with detailed test results

### Environment Variables
All configuration can be overridden via environment variables:
- `BASE_URL` - Application URL
- `USERNAME` - Default username for tests
- `PASSWORD` - Default password for tests
- `TIMEOUT` - Global timeout for actions
- `SLOW_MO` - Delay between actions in milliseconds

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:debug` | Debug mode with browser dev tools |
| `npm run test:ui` | Interactive UI mode for test development |
| `npm run test:report` | View HTML test report |
| `npm run test:chromium` | Run tests only in Chromium |
| `npm run test:firefox` | Run tests only in Firefox |
| `npm run test:webkit` | Run tests only in WebKit |

## Adding New Pages

### Step 1: Create Locators File
```javascript
// locators/NewPageLocators.js
export const NewPageLocators = {
  element: '#element-id',
  button: '[data-test="button"]',
  input: '.input-field'
};
```

### Step 2: Create Page Object
```javascript
// pages/NewPage.js
import { expect } from '@playwright/test';
import { NewPageLocators } from '../locators/NewPageLocators.js';

export class NewPage {
  constructor(page) {
    this.page = page;
    this.locators = NewPageLocators;
  }
  
  async performAction() {
    await this.page.locator(this.locators.element).click();
  }
  
  async assertElementVisible() {
    await expect(this.page.locator(this.locators.element)).toBeVisible();
  }
}
```

### Step 3: Use in Tests
```javascript
// tests/newPage.spec.js
import { test, expect } from '@playwright/test';
import { NewPage } from '../pages/NewPage.js';

test('new page test', async ({ page }) => {
  const newPage = new NewPage(page);
  await newPage.performAction();
  await newPage.assertElementVisible();
});
```

## Best Practices

1. **Element Selection**: Use data-testid attributes when possible
2. **Wait Strategies**: Use explicit waits for better reliability
3. **Error Handling**: Implement proper error handling in page objects
4. **Test Data**: Keep test data separate from test logic
5. **Assertions**: Use descriptive assertion messages
6. **Locator Management**: Keep all selectors in dedicated locator files
7. **Method Focus**: Page objects should contain only methods, not selectors
8. **AAA Pattern**: Structure tests with Arrange, Act, Assert sections
9. **Page Object Model**: Use consistent POM pattern across all pages

## Troubleshooting

### Common Issues
1. **Browser not found**: Run `npx playwright install`
2. **Environment variables not loading**: Ensure `.env` file exists in root directory
3. **Tests timing out**: Increase `TIMEOUT` value in `.env` file
4. **Tests running too fast**: Increase `SLOW_MO` value for debugging
5. **Module not found errors**: Clear cache with `npx playwright install --force`

### Debug Tips
- Use `npm run test:debug` to step through tests
- Use `npm run test:ui` for interactive test development
- Check `playwright-report/` for detailed test results
- Use `trace: 'on-first-retry'` for detailed failure analysis
- Run tests with `--headed` flag to see browser interactions

## Test Results

The framework generates comprehensive test reports including:
- **HTML Reports**: Detailed test execution results with screenshots
- **Test Results**: Individual test outcomes and timing
- **Screenshots**: Automatic screenshots on test failures
- **Traces**: Detailed execution traces for debugging
- **Cross-browser Results**: Results across Chromium, Firefox, and WebKit