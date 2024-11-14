import { Page } from '@playwright/test';

async function handleAlert(page: Page, buttonSelector: string, action: 'accept' | 'dismiss' | 'input' = 'accept', inputText?: string) {
  page.once('dialog', async dialog => {
    console.log(`${dialog.type()} alert message:`, dialog.message());
    if (action === 'accept') {
      await dialog.accept(inputText);
    } else if (action === 'dismiss') {
      await dialog.dismiss();
    } else if (action === 'input') {
      await dialog.accept(inputText);
    }
  });
  await page.click(buttonSelector);
}

export { handleAlert };


 
export class ElementUtils {
    private page: Page;
 
    constructor(page: Page) {
        this.page = page;
    }
 
    async clickLink(linkText: string): Promise<void> {
        await this.page.getByText(linkText).click();
    }
    async clickElementByText(elementText: string): Promise<void> {
        await this.page.getByText(elementText).click();
    }
}
