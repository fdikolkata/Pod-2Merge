import * as os from "node:os";
import * as process from "node:process";
import { Status } from "allure-js-commons";
 
export default {
  format: ["allure-cucumberjs/reporter"],
  formatOptions: {
    resultsDir: "allure-results"
   
       
    },
};