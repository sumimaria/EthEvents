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


// import { Contract, JsonRpcProvider } from "ethers";
// import { createRequire } from "module";

// const require = createRequire(import.meta.url);
// const details = require("../artifacts/details.json");
// const Cert = require("../artifacts/contracts/Cert.sol/Cert.json");

// const provider = new JsonRpcProvider("https://ethereum-hoodi-rpc.publicnode.com");
// const contract = new Contract(details.contract, Cert.abi, provider);

// console.log("👂 Listening for Issued events on Hoodi...");
// console.log("📄 Contract:", details.contract);

// contract.on("Issued", (course, id, grade, event) => {
//   console.log("─────────────────────────────────────");
//   console.log("🎓 New Certificate Issued!");
//   console.log("   Course :", course);
//   console.log("   ID     :", id.toString());
//   console.log("   Grade  :", grade);
//   console.log("   Tx Hash:", event.log.transactionHash);
//   console.log("─────────────────────────────────────");
// })();

// // contract.on("error", (err) => {
// //   console.error("Contract error:", err);
// // // }
// // );