import * as XLSX from 'xlsx';
import * as path from 'path';
import { Page } from "playwright";

// Function to read data from Excel
export function readExcel(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  //const sheetName = workbook.SheetNames[0];
  const sheetName = "Sheet1";
  const sheet = workbook.Sheets[sheetName];
  let sheetData =  XLSX.utils.sheet_to_json(sheet);
  console.log(sheetData);
  return sheetData;
}

// Function to write data to Excel file
export function writeExcel(filePath: string, data: any[]) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filePath);
}

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

// Define the path to the Excel file
export const excelFilePath1 = path.resolve(__dirname, 'SignUpData.xlsx');
export const excelFilePath2 = path.resolve(__dirname, 'FormData.xlsx');
