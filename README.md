# Playwright Test Automation Framework

This project uses Playwright for end-to-end testing with a Page Object Model (POM) pattern, separated locators structure, and environment configuration.

## Project Structure

```
├── locators/
│   ├── index.js                  # Central export point for all locators
│   ├── LandingPageLocators.js    # Landing page selectors
│   └── InventoryPageLocators.js  # Inventory page selectors (example)
├── pages/
│   └── LandingPage.js            # Landing page object with methods only
├── tests/
│   ├── landingPage.spec.js       # Landing page tests
│   ├── login.spec.js             # Login functionality tests
│   └── example.spec.js           # Example tests
├── .env                          # Environment variables
├── playwright.config.js          # Playwright configuration
└── package.json                  # Dependencies and scripts
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   BASE_URL=https://www.saucedemo.com
   USERNAME=standard_user
   PASSWORD=secret_sauce
   TIMEOUT=30000
   HEADLESS=false
   SLOW_MO=100
   ```

## Running Tests

- **Run all tests:** `npm test`
- **Run tests in headed mode:** `npm run test:headed`
- **Run tests with debug mode:** `npm run test:debug`
- **Run tests with UI mode:** `npm run test:ui`
- **View test report:** `npm run test:report`
- **Run specific browser:** `npm run test:chromium`

## Architecture Overview

The framework uses a clean separation of concerns with three main components:

### 1. **Locators** (`/locators/`)
- **LandingPageLocators.js**: Contains all CSS selectors for the landing page
- **InventoryPageLocators.js**: Example locators for inventory page
- **index.js**: Central export point for all locators
- **Benefits**: Easy maintenance, reusability, clear separation

### 2. **Page Objects** (`/pages/`)
- **LandingPage.js**: Contains only methods and business logic
- **No selectors**: All selectors are imported from locators
- **Clean methods**: Focus on actions and assertions

### 3. **Environment Configuration**
- **Direct dotenv usage**: Environment variables loaded directly from `.env` file
- **Default values**: Fallback values provided in code when environment variables are not set
- **Easy extension**: Add new environment variables to `.env` file

## Environment Configuration

Environment variables are managed through:
- `.env` file for local development (create this file manually)
- Direct `process.env` access in code with fallback defaults
- `playwright.config.js` and page objects load environment variables using `dotenv.config()`

## Best Practices

1. **Element Selection**: Use data-testid attributes when possible
2. **Wait Strategies**: Use explicit waits for better reliability
3. **Error Handling**: Implement proper error handling in page objects
4. **Test Data**: Keep test data separate from test logic
5. **Assertions**: Use descriptive assertion messages
6. **Locator Management**: Keep all selectors in dedicated locator files
7. **Method Focus**: Page objects should contain only methods, not selectors

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

### Step 2: Export from Index
```javascript
// locators/index.js
export { NewPageLocators } from './NewPageLocators.js';
```

### Step 3: Create Page Object
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

### Step 4: Use in Tests
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

## Current Test Coverage

### Landing Page Tests (`tests/landingPage.spec.js`)
- ✅ Page navigation
- ✅ Title assertion
- ✅ Login form visibility

### Login Tests (`tests/login.spec.js`)
- ✅ Login form elements visibility
- ✅ Valid credentials login
- ✅ Invalid credentials error handling
- ✅ Empty credentials validation
- ✅ Form field clearing functionality

## Available Scripts

- `npm test` - Run all tests
- `npm run test:headed` - Run tests with browser visible
- `npm run test:debug` - Debug mode with browser dev tools
- `npm run test:ui` - Interactive UI mode
- `npm run test:report` - View HTML test report
- `npm run test:chromium` - Run tests only in Chromium
- `npm run test:firefox` - Run tests only in Firefox
- `npm run test:webkit` - Run tests only in WebKit
