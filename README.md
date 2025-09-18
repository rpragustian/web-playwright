# Playwright Test Automation Framework

This project uses Playwright for end-to-end testing with a Page Object Model (POM) pattern, separated locators structure, and environment configuration. The framework is designed to test the SauceDemo application with clean, maintainable, and scalable test automation.

## Project Structure

```
├── config/                       # Configuration files
├── locators/                     # Page element locators
│   ├── index.js                  # Central export point for all locators
│   ├── LandingPageLocators.js    # Landing page selectors
│   ├── ProductPageLocators.js    # Product page selectors
│   ├── CartPageLocators.js       # Cart page selectors
│   ├── checkoutCustomerInformation.js  # Checkout info page selectors
│   ├── checkoutOverview.js       # Checkout overview page selectors
│   └── checkoutStatus.js         # Checkout status page selectors
├── pages/                        # Page Object Model classes
│   ├── LandingPage.js            # Landing page object with methods
│   ├── ProductPage.js            # Product page object with methods
│   ├── CartPage.js               # Cart page object with methods
│   ├── checkoutCustomerInformation.js  # Checkout info page object
│   ├── checkoutOverview.js       # Checkout overview page object
│   └── checkoutStatus.js         # Checkout status page object
├── tests/                        # Test specifications
│   ├── login.spec.js             # Login functionality tests
│   ├── addToCart.spec.js         # Add to cart functionality tests
│   ├── checkout.spec.js          # Complete checkout process tests
│   └── logout.spec.js            # Logout functionality tests
├── playwright-report/            # HTML test reports (generated)
├── test-results/                 # Test execution results (generated)
│   ├── screenshots/              # Screenshots on test failures
│   ├── videos/                   # Video recordings on test failures
│   ├── results.json              # JSON test results
│   └── junit.xml                 # JUnit XML results
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
   TEST_PASSWORD=secret_sauce
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
- **Run checkout tests:** `npx playwright test tests/checkout.spec.js`
- **Run tests with specific browser:** `npx playwright test --project=chromium`
- **Run tests in headed mode:** `npx playwright test --headed`
- **Generate and view report:** `npx playwright show-report`

## Architecture Overview

The framework uses a clean separation of concerns with three main components:

### 1. **Locators** (`/locators/`)
- **LandingPageLocators.js**: Contains all CSS selectors for the landing page
- **ProductPageLocators.js**: Contains selectors for product page elements
- **CartPageLocators.js**: Contains selectors for cart page elements
- **checkoutCustomerInformation.js**: Contains selectors for checkout form
- **checkoutOverview.js**: Contains selectors for checkout summary
- **checkoutStatus.js**: Contains selectors for order completion
- **Benefits**: Easy maintenance, reusability, clear separation

### 2. **Page Objects** (`/pages/`)
- **LandingPage.js**: Contains login and navigation methods
- **ProductPage.js**: Contains product interaction methods
- **CartPage.js**: Contains cart verification and management methods
- **checkoutCustomerInformation.js**: Contains checkout form methods
- **checkoutOverview.js**: Contains order summary methods
- **checkoutStatus.js**: Contains order completion methods
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
- ✅ **Multiple user types testing** - Tests different user accounts

### Add to Cart Tests (`tests/addToCart.spec.js`)
- ✅ **Multiple product testing** - Tests adding different products to cart
- ✅ **Cart badge verification** - Verifies cart count updates correctly
- ✅ **Cart page navigation** - Tests navigation to cart page
- ✅ **Product verification in cart** - Confirms products appear in cart
- ✅ **Cart management** - Tests removing items and continuing shopping

### Checkout Tests (`tests/checkout.spec.js`)
- ✅ **Complete checkout process** - End-to-end checkout workflow
- ✅ **Customer information form** - Tests form filling and validation
- ✅ **Order overview verification** - Validates order details and pricing
- ✅ **Order completion** - Tests successful order placement
- ✅ **Post-checkout verification** - Confirms cart is cleared after order

### Test Structure
The tests follow the **AAA pattern** (Arrange, Act, Assert):
- **Arrange**: Set up test data and initial state
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome

### Example Test Flow - Complete Checkout
```javascript
test('should complete checkout process', async ({ page }) => {
  // ARRANGE - Set up test data
  const productName = 'Sauce Labs Onesie';
  const firstName = 'John';
  const lastName = 'Doe';
  const postalCode = '12345';

  // ACT - Perform complete checkout workflow
  await productPage.addProductToCart(productName);
  await productPage.clickCartButton();
  await cartPage.clickCheckoutButton();
  await checkoutCustomerInformation.fillFirstName(firstName);
  await checkoutCustomerInformation.fillLastName(lastName);
  await checkoutCustomerInformation.fillPostalCode(postalCode);
  await checkoutCustomerInformation.clickContinueButton();
  await checkoutOverview.clickFinishButton();

  // ASSERT - Verify successful order completion
  await checkoutStatus.assertPageTitle();
  await checkoutStatus.assertCompleteOrderStatus();
  await checkoutStatus.clickBackHomeButton();
  await productPage.assertCartBadgeNotDisplayed();
});
```

## Page Object Model Implementation

### ProductPage Methods
- `addProductToCart(productName)` - Adds a specific product to cart
- `assertCartBadge(expectedCount)` - Verifies cart badge count
- `assertCartBadgeNotDisplayed()` - Verifies cart badge is hidden
- `removeItemFromProductPage(productName)` - Removes item from product page
- `clickCartButton()` - Navigates to cart page

### CartPage Methods
- `assertCartPage(productName)` - Verifies product is in cart
- `removeItemFromCart()` - Removes item from cart
- `continueShopping()` - Returns to products page
- `clickCheckoutButton()` - Proceeds to checkout

### CheckoutCustomerInformation Methods
- `assertPageTitle()` - Verifies checkout page title
- `fillFirstName(firstName)` - Fills first name field
- `fillLastName(lastName)` - Fills last name field
- `fillPostalCode(postalCode)` - Fills postal code field
- `clickContinueButton()` - Proceeds to checkout overview
- `assertErrorMessage(errorMessage)` - Verifies error messages

### CheckoutOverview Methods
- `assertItemProductName(productName)` - Verifies product name in summary
- `assertItemProductPrice(productName)` - Verifies product price
- `assertItemProductQuantity(productName)` - Verifies product quantity
- `assertPaymentInfoLabel()` - Verifies payment information
- `assertShippingInfoLabel()` - Verifies shipping information
- `assertTotalLabel()` - Verifies total amount
- `clickFinishButton()` - Completes the order

### CheckoutStatus Methods
- `assertPageTitle()` - Verifies order completion page
- `assertCompleteOrderStatus()` - Verifies order success
- `assertCompleteOrderText()` - Verifies completion message
- `clickBackHomeButton()` - Returns to product page

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
- **Screenshots**: Captured automatically on test failures
- **Video Recording**: Records test execution on failures
- **Multiple Reporters**: HTML, JSON, JUnit XML, and Console output

### Environment Variables
All configuration can be overridden via environment variables:
- `BASE_URL` - Application URL
- `USERNAME` - Default username for tests
- `TEST_PASSWORD` - Test password (stored securely in .env)
- `TIMEOUT` - Global timeout for actions
- `SLOW_MO` - Delay between actions in milliseconds

## Test Reporting System

### Multiple Report Formats
The framework generates comprehensive reports in multiple formats:

```javascript
// In playwright.config.js
reporter: [
  ['html', { outputFolder: 'playwright-report' }],     // HTML report
  ['json', { outputFile: 'test-results/results.json' }], // JSON report
  ['junit', { outputFile: 'test-results/junit.xml' }],   // JUnit XML report
  ['list']                                               // Console output
],
```

### 1. HTML Report 📄
- **Location**: `playwright-report/index.html`
- **Features**: Interactive web interface with screenshots, videos, traces
- **View**: `npm run test:report` or `npx playwright show-report`
- **Benefits**: Visual debugging, easy navigation, comprehensive test details

### 2. JSON Report 📋
- **Location**: `test-results/results.json`
- **Features**: Machine-readable format with complete test data
- **Usage**: Programmatic analysis, CI/CD integration, custom reporting
- **Content**: Test configuration, results, timing, metadata, traces

### 3. JUnit XML Report 🔧
- **Location**: `test-results/junit.xml`
- **Features**: Standard format for CI systems
- **Usage**: Jenkins, Azure DevOps, GitHub Actions integration
- **Content**: Test results in XML format with pass/fail status

### 4. Console Reporter 📝
- **Output**: Real-time console output during test execution
- **Features**: Live test progress, immediate feedback
- **Usage**: Development and debugging

### Report File Structure
```
├── playwright-report/
│   ├── index.html              # Interactive HTML report
│   └── assets/                 # CSS, JS, images
├── test-results/
│   ├── results.json            # Detailed JSON results
│   ├── junit.xml               # JUnit XML results
│   ├── screenshots/            # Failure screenshots
│   └── videos/                 # Failure videos
```

## Screenshot and Video Capture

### Automatic Failure Capture
The framework automatically captures screenshots and videos when tests fail:

```javascript
// In playwright.config.js
use: {
  screenshot: 'only-on-failure',    // Screenshots on test failures
  video: 'retain-on-failure',       // Video recordings on failures
  trace: 'on-first-retry',          // Detailed traces for debugging
}
```

### File Organization
When tests fail, the following files are generated:

```
test-results/
├── test-name-chromium/
│   ├── test-failure.png          # Screenshot at failure point
│   └── video.webm                # Video recording of test execution
├── test-name-firefox/
│   ├── test-failure.png
│   └── video.webm
└── test-name-webkit/
    ├── test-failure.png
    └── video.webm
```

### Manual Screenshots
You can also take manual screenshots in your tests:

```javascript
// Take screenshot at any point
await page.screenshot({ path: 'custom-screenshot.png' });

// Take full page screenshot
await page.screenshot({ path: 'full-page.png', fullPage: true });

// Take screenshot of specific element
await page.locator('.element').screenshot({ path: 'element.png' });
```

### Viewing Results
- **HTML Report**: `npx playwright show-report` (includes screenshots)
- **Test Results**: Check `test-results/` directory for individual files
- **CI Integration**: Screenshots automatically included in CI reports

## Available Scripts

| Script | Description | Output |
|--------|-------------|---------|
| `npm test` | Run all tests with all reporters | HTML + JSON + JUnit + Console |
| `npm run test:headed` | Run tests with browser visible | All reports |
| `npm run test:debug` | Debug mode with browser dev tools | All reports |
| `npm run test:ui` | Interactive UI mode for test development | All reports |
| `npm run test:report` | View HTML test report | Opens browser |
| `npm run test:chromium` | Run tests only in Chromium | All reports |
| `npm run test:firefox` | Run tests only in Firefox | All reports |
| `npm run test:webkit` | Run tests only in WebKit | All reports |
| `npm run test:json` | Run tests with JSON reporter only | JSON file |
| `npm run test:junit` | Run tests with JUnit reporter only | XML file |
| `npm run test:html` | Run tests with HTML reporter only | HTML report |

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
10. **Text Assertions**: Use `toContainText()` for partial matches, `toHaveText()` for exact matches
11. **Security**: Store sensitive data (passwords) in `.env` files, not in code
12. **Debugging**: Use screenshots and videos for failure analysis
13. **Reporting**: Leverage multiple report formats for different use cases

## Assertion Best Practices

### Text Assertions
```javascript
// Exact text match
await expect(element).toHaveText('Exact text');

// Partial text match (more flexible)
await expect(element).toContainText('Partial text');

// Case-insensitive match
await expect(element).toContainText('text', { ignoreCase: true });

// Multiple possible texts
await expect(element).toContainText(['Option 1', 'Option 2']);
```

### Element State Assertions
```javascript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// Interaction
await expect(element).toBeEnabled();
await expect(element).toBeDisabled();

// Selection
await expect(checkbox).toBeChecked();
await expect(radio).toBeChecked();
```

## Troubleshooting

### Common Issues
1. **Browser not found**: Run `npx playwright install`
2. **Environment variables not loading**: Ensure `.env` file exists in root directory
3. **Tests timing out**: Increase `TIMEOUT` value in `.env` file
4. **Tests running too fast**: Increase `SLOW_MO` value for debugging
5. **Module not found errors**: Clear cache with `npx playwright install --force`
6. **Import path errors**: Ensure import paths match actual filenames (case-sensitive)
7. **Screenshots not generated**: Check `test-results/` directory after test failures
8. **Reports not generated**: Verify reporter configuration in `playwright.config.js`

### Debug Tips
- Use `npm run test:debug` to step through tests
- Use `npm run test:ui` for interactive test development
- Check `playwright-report/` for detailed test results
- Use `trace: 'on-first-retry'` for detailed failure analysis
- Run tests with `--headed` flag to see browser interactions
- Use `toContainText()` instead of `toHaveText()` for more flexible assertions
- Check `test-results/` directory for screenshots and videos on failures
- Use `npx playwright show-report` to view comprehensive test results
- Parse `results.json` for programmatic analysis
- Use `junit.xml` for CI/CD pipeline integration

## Test Results

The framework generates comprehensive test reports including:
- **HTML Reports**: Interactive web interface with detailed test results
- **JSON Reports**: Machine-readable format for programmatic analysis
- **JUnit XML**: Standard format for CI/CD integration
- **Test Results**: Individual test outcomes and timing
- **Screenshots**: Automatic screenshots on test failures
- **Videos**: Video recordings of failed test executions
- **Traces**: Detailed execution traces for debugging
- **Cross-browser Results**: Results across Chromium, Firefox, and WebKit

## E-commerce Test Scenarios Covered

### Complete User Journeys
1. **Login Flow**: User authentication and session management
2. **Product Browsing**: Adding multiple products to cart
3. **Cart Management**: Adding, removing, and updating cart items
4. **Checkout Process**: Complete order placement workflow
5. **Order Confirmation**: Post-purchase verification

### Business Logic Validation
- **Inventory Management**: Product availability and selection
- **Pricing Calculations**: Subtotal, tax, and total calculations
- **Order Processing**: Complete order lifecycle
- **User Experience**: Navigation and interaction flows
- **Error Handling**: Form validation and error messages

This comprehensive test suite ensures the SauceDemo application works correctly across all major user scenarios and business requirements.