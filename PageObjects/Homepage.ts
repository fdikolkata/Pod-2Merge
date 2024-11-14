import { test, expect, Locator, Page } from "@playwright/test";

export class Homepage {
  navMenu: Locator;
  featuredItemsSection: Locator;
  product: Locator;
  overlay: Locator;
  categoriesSection: Locator;
  firstProduct: Locator;
  productImage: Locator;
  productName: Locator;
  productPrice: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.locator(".navbar-nav");
    this.featuredItemsSection = page.locator(".features_items");
    this.product = this.featuredItemsSection.locator(".product-image-wrapper").first();
    this.overlay = this.product.locator(".overlay-content");
    this.categoriesSection = page.locator('.left-sidebar .panel-group');
    this.firstProduct = this.featuredItemsSection.locator(".product-image-wrapper").first();
    this.productImage = this.firstProduct.locator("img");
    this.productName = this.firstProduct.locator(".productinfo h2");
    this.productPrice = this.firstProduct.locator(".productinfo h2");
  }

  async VerifyTitle(HomepageTitle: string) {
    await expect(this.page).toHaveTitle(HomepageTitle);
  }

  async VerifyNavigationMenu(expectedMenuItems : string[]) {
    for (const menuItem of expectedMenuItems) {
      await expect(this.navMenu.locator(`text=${menuItem}`)).toBeVisible();
    }
    //await this.page.goBack();
  }
  async VerifyOverlayOfProducts() {
    await expect(this.featuredItemsSection).toBeVisible();
    await this.product.hover();
    await expect(this.overlay).toBeVisible();
  }
  async VerifyCategorySection(expectedCategories : string[]) {
      for (const category of expectedCategories) {
        await expect(this.categoriesSection.locator(`a:has-text("${category}")`).first()).toBeVisible();
      }
  }

  async VerifyFeaturesSection() {
    await expect(this.firstProduct).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await this.firstProduct.locator('a:has-text("View Product")').click();
    await expect(this.page).toHaveURL(/product_details/);
    await expect(this.page.locator(".product-information")).toBeVisible();
  }
}

module.exports = { Homepage };
