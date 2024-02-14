import { deployAndVerify } from "../src/deployAndVerify";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract } from "ethers";
import { dim } from "chalk";

export default async function deployToLocal(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY === "v1.0.0.local") {
    dim(`Deploying: Hardhat Local`);
    dim(`Version: 1.0.0`);
  } else {
    return;
  }

  const { getNamedAccounts, ethers } = hardhat;
  const { deployer, defenderRelayer } = await getNamedAccounts();

  // ===================================================
  //                 Deploy Contracts                 //
  // ===================================================

  const preMarket: Contract = await deployAndVerify("PreMarket", [], false);

  const preMarketAddress = await preMarket.getAddress();

  const transparentUpgradeableProxy: Contract = await deployAndVerify(
    "TransparentUpgradeableProxy",
    [
      preMarket, // address _logic implementation
      deployer, // address admin
      "0x", // bytes memory _data
    ],
    false
  );

  // ===================================================
  // Configure Contracts
  // SETTER
  // ===================================================
}
