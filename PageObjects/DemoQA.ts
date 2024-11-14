import { test, expect, Locator, Page } from "@playwright/test";
import { readExcel, excelFilePath2 } from "../Utils/ExcelUtils";
import { readJson, jsonFilePath2 } from "../Utils/JsonUtils";
import { handleAlert } from "../Utils/ElementUtils";

export class ForDemo {
 
  //FillForm
  page: Page;
  formsButton: string;
  practiceFormOption: string;
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  maleGenderRadio: string;
  mobileNumberInput: string;
  subjectInput: string;
  uploadPictureInput: string;
  currentAddressInput: string;
  stateDropdown: string;
  cityDropdown: string;
  submitButton: string;
  modalContent: string;
  closeModal: string;
  adsStrings: string;
  filePath : any;

  //HandleAlerts
  alertsMenuButton : string;
  alertsOption : string;
  alertButton : string;
  confirmButton : string;
  confirmResult : string; 
  promptButton : string; 
  promptResult : string; 
  timerAlertButton : string;


  constructor(page: Page) {

      //FillForm
      this.page = page;
      this.formsButton = 'text=Forms';
      this.practiceFormOption = 'text=Practice Form';
      this.firstNameInput= '#firstName';
      this.lastNameInput= '#lastName';
      this.emailInput= '#userEmail';
      this.maleGenderRadio= 'label[for="gender-radio-1"]';
      this.mobileNumberInput= '#userNumber';
      this.subjectInput="#subjectsInput";
      this.uploadPictureInput= '#uploadPicture';
      this.currentAddressInput= '#currentAddress';
      this.stateDropdown= '#state';
      this.cityDropdown= '#city';
      this.submitButton= '#submit';
      this.modalContent= '.modal-content';
      this.closeModal= "#closeLargeModal";
      this.adsStrings= 'iframe, div[id^="google_ads_iframe"]';

      this.filePath = "./utils/image.jpg"; 

      //HandleAlerts
    this.alertsMenuButton = 'text=Alerts'; 
    this.alertsOption = 'li:has-text("Alerts")'; 
    this.alertButton = '#alertButton'; 
    this.confirmButton = '#confirmButton'; 
    this.confirmResult = '#confirmResult'; 
    this.promptButton = '#promtButton'; 
    this.promptResult = '#promptResult'; 
    this.timerAlertButton = '#timerAlertButton'
  }

  async fillForm() {
    await this.page.click(this.formsButton);

    // Verify navigation to the Forms page
    await expect(this.page).toHaveURL("https://demoqa.com/forms");
    console.log("Successfully navigated to the Forms page");

    // Click on the Practice Form option
    await this.page.click(this.practiceFormOption);

    // Read data from Excel file
    const signupData = readExcel(excelFilePath2);
    // Read additional details from JSON file
    const signupDetailsArray = readJson(jsonFilePath2);

    let i = 0;
    for (const data of signupData) {
      const { firstName, lastName, email } = data as {
        firstName: string;
        lastName: string;
        email: string;
      };
      const signupDetails = signupDetailsArray[i++];

      // Remove any obstructing elements
      // Remove any obstructing iframes using Playwright's methods 
      const ads = await this.page.$$(this.adsStrings); 
      for (const ad of ads) { 
      await ad.evaluate(node => node.remove()); }

      // Fill out the form using data from Excel and JSON files
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.page.fill(this.emailInput, email);

      await this.page.fill(this.mobileNumberInput, signupDetails.mobile);
      await this.page.getByText(`${signupDetails.gender}`, { exact: true }).click();
      await this.page.fill(this.subjectInput, signupDetails.subjects);
      await this.page.fill(this.currentAddressInput, signupDetails.currentAddress);
      await this.page.getByText(`${signupDetails.hobbies}`, { exact: true }).click();
      
      // Upload picture 
      await this.page.setInputFiles(this.uploadPictureInput,this.filePath);

      await this.page.click(this.stateDropdown);
      const state = `${signupDetails.state}`;
      await this.page.click(`div[id*="react-select-3-option"]:has-text('${state}')`);  // Replace with the desired state

      await this.page.click(this.cityDropdown);
      const city = `${signupDetails.city}`;
      await this.page.click(`div[id*="react-select-4-option"]:has-text('${city}')`);  // Replace with the desired city

      // Submit the form
      await this.page.locator(this.submitButton).click();

      // Verify form submission success
      await expect(this.page.locator(this.modalContent)).toBeVisible({
        timeout: 6000,
      });
      await this.page.click(this.closeModal);

      console.log(
        `Form submission completed successfully for ${firstName} ${lastName}`
      );
    }
  }

async HandleAlerts() {
  await this.page.click(this.alertsMenuButton);

  // Verify navigation to the Forms page
  await expect(this.page).toHaveURL("https://demoqa.com/alertsWindows");
  console.log("Successfully navigated to the Alerts page");

  // Click on the Practice Form option
  await this.page.click(this.alertsOption);

  // Handle the first alert (simple alert)
  await handleAlert(this.page, this.alertButton, "accept");

  // Handle the second alert (confirmation alert)
  await handleAlert(this.page, this.confirmButton, "accept"); // Use 'dismiss' for canceling
  const confirmResultText = await this.page
    .locator("#confirmResult")
    .textContent();
  console.log("Result text after confirmation:", confirmResultText);

  // Handle the third alert (prompt alert)
  await handleAlert(this.page, this.promptButton, "input", "Test input");
  const promptResultText = await this.page.locator(this.promptResult).textContent();
  console.log("Result text after prompt:", promptResultText);

  // Handle the fourth alert (delayed alert)
  await handleAlert(this.page, this.timerAlertButton, "accept");
  console.log("Delayed alert handled");
  }
 
 
}

module.exports = { ForDemo };
