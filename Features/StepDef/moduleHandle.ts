import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/hooks"; // Importing the page object from hooks

When("Click on button {string}", async function (btnName) {

  const btn = await page.getByText(btnName);
  btn.click();
});

Then(
  "User navigates to small module page and verify small module page content {string}",
  async function (pageContent) {
   page.waitForLoadState("networkidle");
    const moduleDialogs = await page.locator(".text-center");

    await expect(moduleDialogs).toContainText("Modal Dialogs");
    const smallModel = await page.locator("#showSmallModal");
    await smallModel.click();

    const modulePopupHeadings = await page.locator(
      "#example-modal-sizes-title-sm"
    );
    await expect(modulePopupHeadings).toContainText("Small Modal");
    const modulePopupContent = await page.locator(".modal-body");
    await expect(modulePopupContent).toContainText(pageContent);

    const closeBtn = await page.locator("#closeSmallModal");
    closeBtn.click();
  }
);

Then(
  "User navigates to large module page and verify large module page content {string}",
  async function (pageContent) {
    page.waitForLoadState("networkidle");
   
    const moduleDialogs = await page.locator(".text-center");
    await expect(moduleDialogs).toContainText("Modal Dialogs");
    const largeModel = await page.locator("#showLargeModal");
    await largeModel.click();

    const modulePopupHeadings = await page.locator(
      "#example-modal-sizes-title-lg"
    );
    await expect(modulePopupHeadings).toContainText("Large Modal");
    const modulePopupContent = await page.locator(".modal-body");
    await expect(modulePopupContent).toContainText(pageContent);

    const closeBtn = await page.locator("#closeLargeModal");
    closeBtn.click();
  }
);
