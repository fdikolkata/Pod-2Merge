import { Before, After, setDefaultTimeout, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from 'playwright';
import { POManager } from "../../PageObjects/POManager"
import * as dotenv from 'dotenv';
dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let poManager :POManager;

setDefaultTimeout(70 * 1000);

BeforeAll(async () => {
  console.clear();
  browser = await chromium.launch({ headless: false });
  // context = await browser.newContext();
  // page = await context.newPage();
  
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
  // context = await browser.newContext();
  // page = await context.newPage();
  // await page.goto('http://automationexercise.com');
  poManager = new POManager(page);
});

After(async () => {
  // await page.close();
  // await context.close();
});

AfterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

export { page ,poManager};
