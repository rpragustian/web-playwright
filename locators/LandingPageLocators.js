/**
 * Landing Page Locators
 * Contains all CSS selectors and locators for the Landing/Login page
 */
export const LandingPageLocators = {
  // Form elements
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  
  // Error handling
  errorMessage: '[data-test="error"]',
  
  // Page structure elements
  loginContainer: '.login_container',
  botImage: '.bot_column img',
  logo: '.login_logo',
  
  // Additional elements that might be useful
  usernameLabel: '[for="user-name"]',
  passwordLabel: '[for="password"]',
  loginCredentials: '#login_credentials',
  loginPassword: '.login_password',
  
  // Footer elements
  footer: '.footer',
  footerText: '.footer_copy',
  
  // Performance glitch user elements (if needed for testing)
  performanceGlitchUser: '[data-test="login-credentials"]',
  
  // Social media links (if present)
  twitterLink: '[data-test="social-twitter"]',
  facebookLink: '[data-test="social-facebook"]',
  linkedinLink: '[data-test="social-linkedin"]'
};
