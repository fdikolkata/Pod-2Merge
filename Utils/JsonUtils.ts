import * as fs from 'fs';
import * as path from 'path';

// Function to read data from JSON file
export function readJson(filePath: string) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Function to write data to JSON file
export function writeJson(filePath: string, data: any) {
  const jsonData = JSON.stringify(data, null, 2); // Format JSON with 2-space indentation
  fs.writeFileSync(filePath, jsonData, 'utf-8');
}


// Define the path to the Excel file
export const jsonFilePath1 = path.resolve(__dirname, 'SignUpAddData.json');
export const jsonFilePath2 = path.resolve(__dirname, 'FormAddData.json');