/**
 * Product Page Locators
 * Contains all CSS selectors and locators for the Product page
 * This is an example file showing how to structure locators for other pages
 */
export const ProductPageLocators = {
  // Header elements
  header: '.header_container',
  title: '.title',
  shoppingCart: '.shopping_cart_link',
  cartButton: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  
  // Product elements
  productContainer: '.inventory_container',
  productItem: '.inventory_item',
  productName: '.inventory_item_name',
    
  // Dynamic locator for specific product
  getProductByName: (productName) => `.inventory_item:has(.inventory_item_name:text("${productName}")) .btn_primary`,
  removeProductByName: (productName) => `.inventory_item:has(.inventory_item_name:text("${productName}")) .btn_secondary`,
  
  productDescription: '.inventory_item_desc',
  productPrice: '.inventory_item_price',
  addToCartButton: '.btn_primary',
  removeButton: '.btn_secondary',
  
  // Filter elements
  productSort: '[data-test="product-sort-container"]',
  sortByNameAZ: 'option[value="az"]',
  sortByNameZA: 'option[value="za"]',
  sortByPriceLowHigh: 'option[value="lohi"]',
  sortByPriceHighLow: 'option[value="hilo"]',
  
  // Footer elements
  footer: '.footer',
  footerText: '.footer_copy',
  
  // Social media links
  twitterLink: '[data-test="social-twitter"]',
  facebookLink: '[data-test="social-facebook"]',
  linkedinLink: '[data-test="social-linkedin"]'
};
