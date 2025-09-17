/**
 * Checkout Overview Locators
 * Contains all CSS selectors and locators for the Checkout Overview page
 */
export const CheckoutOverviewLocators = {
  title: '[data-test="title"]text("Checkout: Overview")',
  finishButton: '#finish',
  cancelButton: '#cancel',
  errorMessage: '[data-test="error"]',
  itemProductName: '.inventory_item_name',
  itemProductPrice: '.inventory_item_price',
  itemProductQuantity: '.cart_quantity',
  itemProductDescription: '.inventory_item_desc',
  paymentInfoLabel: '[data-test="payment-info-label"]',
  paymentInfoValue: '[data-test="payment-info-value"]',
  shippingInfoLabel: '[data-test="shipping_info_label"]',
  itemTotalLabel: '[data-test="total-info-label"]',
  subTotalLabel: '[data-test="subtotal-label"]',
  taxLabel: '[data-test="tax-label"]',
  totalLabel: '[data-test="total-label"]'
};