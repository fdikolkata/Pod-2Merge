import { Given, Then, When} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, poManager} from '../support/hooks'; // Importing the page object from hooks

import { POManager } from '../../PageObjects/POManager';
const urls:any = {
  demoQAUrl: process.env.demoQAURL
};

Given('user navigates to the homepage and verify Page Title as {string}', async function (PageTitle) {
  //await page.goto('http://automationexercise.com'); // Adjust URL as necessary
  await expect(page).toHaveTitle(PageTitle);
});

// Step: Verify Navigation Menu
Then('user verifies Navigation menu contains correct options with working links', async function () {
  const navMenu = page.locator('.navbar-nav');
  const expectedMenuItems = ['Home', 'Products', 'Cart', 'Signup / Login', 'Test Cases', 'API Testing', 'Contact us'];
  for (const menuItem of expectedMenuItems) {
    await expect(navMenu.locator(`text=${menuItem}`)).toBeVisible();
  }
});

// Step: Verify Overlay with Product Details
Then('user hovers on Product and verify Overlay with Product Details is Visible', async function () {
  const featuredItemsSection = page.locator('.features_items'); 
  await expect(featuredItemsSection).toBeVisible();
  const product = featuredItemsSection.locator('.product-image-wrapper').first();
  await product.hover();
  const overlay = product.locator('.overlay-content'); 
  await expect(overlay).toBeVisible();
});

// Step: Verify Categories Section Lists All Categories Correctly
Then('user verifies Categories Section Lists All Categories Correctly as below', async function (dataTable:any) {
  const categoriesSection = page.locator('.left-sidebar .panel-group'); 
  const expectedCategories:string[] = dataTable.raw().flat();
  //const expectedCategories = ['Women', 'Men', 'Kids'];
    for (const category of expectedCategories) {
      await expect(categoriesSection.locator(`a:has-text("${category}")`).first()).toBeVisible();
    }
});

// Step: Verify Featured Items Display Correctly
Then('user verifies featured items in features section displays products with accurate details', async function () {
  const featuredItemsSection = page.locator('.features_items');
    const firstProduct = featuredItemsSection.locator('.product-image-wrapper').first();
    await expect(firstProduct).toBeVisible();
    const productImage = firstProduct.locator('img');
    await expect(productImage).toBeVisible();
    const productName = firstProduct.locator('.productinfo h2');
    await expect(productName).toBeVisible();
    const productPrice = firstProduct.locator('.productinfo h2');
    await expect(productPrice).toBeVisible();
    await firstProduct.locator('a:has-text("View Product")').click(); 
    await expect(page).toHaveURL(/product_details/); 
    await expect(page.locator('.product-information')).toBeVisible();
  });


  

Given("user navigates to DemoQA and verify data extraction from json and excel",async () => {
  await page.goto(urls);
  await poManager.getForDemo().fillForm();
  }
);

Then("user verifies different types of Alerts", async () => {
  await page.goto(urls);
  await poManager.getForDemo().HandleAlerts();
});

