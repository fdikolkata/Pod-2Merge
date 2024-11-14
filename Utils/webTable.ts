import { Page } from "@playwright/test";

export default class WebTableUtil {
  async getRowIndex(rowValue: string, page: Page): Promise<any> {
    await page.waitForSelector('[role="grid"]');
    const table = await page.getByRole("grid");
    const rows = await table.getByRole("row");
    console.log("Rows count : ", await rows.count());

    // Iterate over each row to find the search text
    for (let i = 0; i < (await rows.count()); i++) {
      const cells = await rows.nth(i).locator(".rt-td");
      console.log("Cell count : ", await cells.count());
      for (let j = 0; j < (await cells.count()); j++) {
        const cellText = await cells.nth(j).textContent();
        if (cellText?.trim() === rowValue) {
          console.log(`Row number for "${rowValue}": ${i + 1}`);
          return i + 1; // Return 1-based row number
          //rowCount = i + 1;
        }
      }
    }
    console.log(`"${rowValue}" not found in any row`);
    return -1; // Return -1 if not found
  }

  async getColumnIndex(rowCount: number, columnValue: string, page: Page): Promise<String> {
    let valueFromWebTable : any;
    const table = await page.getByRole("grid");
    // Get the headers to find the column index
    const headers = await table.locator('.rt-thead .rt-tr .rt-th').allTextContents();
    console.log(headers);
    const colIndex = headers.indexOf("Author");
    console.log("Index : ", colIndex);
    console.log("Index row : ", rowCount);

    if (colIndex !== -1) {
        // Get the data from the specified row and column
        valueFromWebTable = await table.locator(`.rt-tbody .rt-tr-group:nth-child(${rowCount - 1}) .rt-td:nth-child(${colIndex + 1})`).textContent();
    }else{
        valueFromWebTable = null;
        console.log(`Column "Author" not found`);
    }
    return valueFromWebTable;
  }
}
