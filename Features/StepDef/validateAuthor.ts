import { Given, Then, When } from "@cucumber/cucumber";
import { expect, Locator } from "@playwright/test";
import { page } from "../support/hooks"; // Importing the page object from hooks
import WebTableUtil from "../../Utils/webTable";

const urls = {
  demoQAUrl: process.env.demoQAURL
};

Given(`user navigates to homepage and verify Page Title as {string}`, async function(PageTitle: string) {
  // [Given] Sets up the initial state of the system.
  await this.page.waitForEvent("networkidle");
  await expect(page).toHaveTitle(PageTitle);
});

Then(
  "user verifies category card contains correct options with working links",
  async function () {
    const categoryCards = page.locator(".category-cards");
    const expectedCategoryItems = [
      "Elements",
      "Forms",
      "Alerts, Frame & Windows",
      "Widgets",
      "Interactions",
      "Book Store Application",
    ];
    for (const menuItem of expectedCategoryItems) {
      await expect(categoryCards.locator(`text=${menuItem}`)).toBeVisible();
    }
  }
);

Then(`user clicks on the {string}`, async function (categoryCard) {
  await page.getByText(categoryCard).click();
});

Then(
  `user validate the author {string} of title {string}`,
  async function (columnValue, rowValue) {
    let rowCount: any;
    let valueFromWebTable: any; 
    const webTableUtil = new WebTableUtil();
    rowCount = await webTableUtil.getRowIndex(rowValue, page);
    valueFromWebTable = await webTableUtil.getColumnIndex(rowCount, columnValue, page);
    expect(valueFromWebTable).toEqual(columnValue);
  }
);

