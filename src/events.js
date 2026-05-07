import "dotenv/config";
import chalk from "chalk";
import instance from "./ethers.js";

(() => {
  console.log(chalk.magenta("Listening for Issue Events..."));
  console.log(chalk.cyan("Contract: " + instance.target));

  instance.on("Issued", (course, id, grade, event) => {
    console.log(chalk.bgGreen("**** EVENT OCCURED ****"));
    console.log("course:", course);
    console.log("id:", id.toString());
    console.log("grade:", grade);
    console.log("tx:", event.log.transactionHash);
    console.log(chalk.bgGreen("***********************"));
  });
})();

