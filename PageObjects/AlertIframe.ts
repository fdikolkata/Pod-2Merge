import { Page,BrowserContext } from "playwright";
import { expect } from "playwright/test";

export class AlertIframe{
    private page: Page;
    constructor(page:Page){
     this.page=page;
     
    
    }
    async openNewTabAndValidateText(selector:string,text:string){
    const [newPage]=await Promise.all([
    this.page.context().waitForEvent('page'),
    this.page.getByText(selector).click()
])
await this.page.waitForLoadState();
expect((await newPage.title()).includes(text))
}
async openNewWindowAndValidateText(windowSelector:string,containsValue:string):Promise<void>{
    try{
        const [newWindowPage]=await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.getByText(windowSelector).click()
        ])
await newWindowPage.waitForLoadState();
const pageContent= await newWindowPage.content();
expect(pageContent).toContain(containsValue)
    }
    catch (error) {
        console.error("error while opening the new Window:", error);
        throw error;
}

}
}