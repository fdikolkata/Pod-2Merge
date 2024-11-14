import { Page } from "playwright";
import { expect } from "playwright/test";
import {ElementUtils} from "../Utils/ElementUtils"

export class DemoElement {
    private page: Page;
    private elementUtils: ElementUtils;
    private downloadButtonLoc:string;


    constructor(page: Page) {
        this.page = page; 
        this.elementUtils = new ElementUtils(page);
        this.downloadButtonLoc="#downloadButton";
        
    }
    async clickElements(element: string): Promise<void> {
        try {
            await this.page.waitForSelector(`text=${element}`, { state: 'visible' });
            await this.page.getByText(element).click();
    
            const isVisible = await this.page.isVisible(`text=${element}`);
            expect(isVisible).toBe(true); 
        } catch (error) {
            console.error(`Error clicking element "${element}" on URL: ${this.page.url()}`);
            console.error(`Error details: ${error}`);
            throw new Error(`Failed to click element "${element}"`);
        }
    }

    async validateTheValidLink(expectedUrl: string): Promise<void> {
        await this.elementUtils.clickElementByText("Click Here for Valid Link");
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(expectedUrl);
    }

    async validateTheInvalidLink(expectedUrl: string): Promise<void> {
        await this.elementUtils.clickElementByText("Click Here for Broken Link");
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(expectedUrl);
    }

    async downloadFileToFolder(folderName: string): Promise<void> {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.click(this.downloadButtonLoc)
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = `${folderName}/${suggestedFileName}`;
        await download.saveAs(filePath);
    }
    
    async uploadFile(fileName: string, folderName: string): Promise<void> {
        const filePath = `${folderName}/${fileName}`; 
        await this.page.setInputFiles('#uploadFile', filePath);
    }
}
