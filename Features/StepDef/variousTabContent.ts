import { Given, Then, When} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/hooks'; // Importing the page object from hooks

Then(
    "Validate the content {string} of tab {string}", async function (tabContent, tabName) {
        const btn = await page.getByRole('tab', {name : tabName});
        btn.click();

        const tabContentFromPage = await page.locator(".tab-content");
        const content = tabContentFromPage.allTextContents();
        console.log(content);
        //await expect(tabContentFromPage).toContainText(tabContent);
    }
);