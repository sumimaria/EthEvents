import { Router } from "express";
import instance from "../ethers.js";
const router = Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Certificate DApp" });
});

router.get("/issue", function (req, res) {
  res.render("issue", { title: "Certificate DApp" });
});

router.get("/fetch", async function (req, res) {
  let query = req.query;
  console.log(query);

  try {
    const result = await instance.Certificates(query.certificateID);
    console.log(result);
    res.render("view", {
      title: "Certificate DApp",
      id: query.certificateID,
      name: result[0],
      course: result[1],
      grade: result[2],
      date: result[3],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/events", async function (req, res) {
  try {
    const { JsonRpcProvider, Contract } = await import("ethers");
    const { createRequire } = await import("module");
    const require = createRequire(import.meta.url);
    const details = require("../../artifacts/details.json");
    const Cert = require("../../artifacts/contracts/Cert.sol/Cert.json");

    const provider = new JsonRpcProvider("https://ethereum-hoodi-rpc.publicnode.com");
    const readContract = new Contract(details.contract, Cert.abi, provider);

    const filter = readContract.filters.Issued();
    const logs = await readContract.queryFilter(filter, -1000);

    const events = logs.map((log) => ({
      course: log.args[0],
      id: log.args[1].toString(),
      grade: log.args[2],
      txHash: log.transactionHash,
      block: log.blockNumber,
    }));

    res.render("events", { title: "Certificate DApp", events });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
