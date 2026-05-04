import "dotenv/config";
import { Interface, JsonRpcProvider, WebSocketProvider, id } from "ethers";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const details = require("../artifacts/details.json");
const Cert = require("../artifacts/contracts/Cert.sol/Cert.json");

let provider;

if (process.env.CHAIN === "sepolia") {
  provider = new WebSocketProvider(
    `wss://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`,
  );
} else if (process.env.CHAIN === "hoodi") {
  provider = new WebSocketProvider(
    `wss://eth-hoodi.g.alchemy.com/v2/${process.env.API_KEY}`,
  );
} else {
  provider = new WebSocketProvider("ws://127.0.0.1:8545");
}

const eventTopic = id("Issued(string,uint256,string)");
const courseTopic = id("Certified Ethereum Developer");

let iface = new Interface(Cert.abi);

await provider
  .getLogs({
    fromBlock: 0,
    toBlock: "latest",
    address: details.contract,
    topics: [eventTopic, courseTopic],
  })
  .then((logs) => {
    logs.forEach((log) => {
      console.log(iface.parseLog(log));
    });
  });

process.exit(0);