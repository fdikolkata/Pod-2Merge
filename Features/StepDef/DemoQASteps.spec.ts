import { Given, Then, Before,When } from '@cucumber/cucumber';
import { page } from "../support/hooks";
import { expect } from 'playwright/test';
import { DemoElement } from '../../PageObjects/DemoElements';
import { AlertIframe } from '../../PageObjects/AlertIframe';
import * as dotenv from 'dotenv';
dotenv.config();
import { POManager } from "../../PageObjects/POManager"; // Importing the page object from hooks


const urls = {
  demoQAUrl: process.env.demoQAURL
};
 
Before(async function () {
  if (!page) {
      throw new Error("Page is not initialized.");
  }  
  this.demoElement = new DemoElement(page);
  this.alertIframe = new AlertIframe(page);
 
});
 
Given('the user navigates to the DemoQA page', async function () {
  const url = urls.demoQAUrl;
  if (!url) {
    throw new Error('SelectorHub URL is not defined in the .env file');
  }
  await page.goto(url);
});
 
Then('the user validates they are on the page', async function() {
  const currentUrl = page.url();
  const expectedUrl = urls.demoQAUrl;
  expect(currentUrl).toBe(expectedUrl);
});
 
Then(`user clicks on the {string} Tab`, async function(element: string) {
  await this.demoElement.clickElements(element);
});
Given(`user first click on valid link and validate the response that user redirect to the link {string}`, async function(url: string) {
  await this.demoElement.validateTheValidLink(url)
});
Then(`user first click on Inavlid link and validate the response that user redirect to the link {string}`, async function(url: string) {
  await this.demoElement.validateTheInvalidLink(url)
});
Then(`user wants to upload file {string} from folder {string}`, async function(fileName, folderName) {
  await this.demoElement.uploadFile(fileName, folderName);
});
 
Then(`user clicks on the Download button to folder {string}`, async function(folderName:string) {
  await this.demoElement.downloadFileToFolder(folderName);
});
Then(`user clicks on the {string} and verifies the text opened in the new Tab {string}`, async function(selector: string, text: string) {
await this.alertIframe.openNewTabAndValidateText(selector,text)
});
Then(`user clicks on the {string} and verifies the text contain in the new Window {string}`, async function(windowSelector: string, containsValue: string) {
  await this.alertIframe.openNewWindowAndValidateText(windowSelector,containsValue)
});
When(`the user switches to the iframe named {string}`, async function(arg0: string) {
});