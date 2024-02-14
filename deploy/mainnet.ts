import { deployAndVerify } from "../src/deployAndVerify";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract } from "ethers";
import { dim } from "chalk";

export default async function deployToMainnet(hardhat: HardhatRuntimeEnvironment) {
  if (process.env.DEPLOY === "v1.0.0.mainnet") {
    dim(`Deploying: Ethereum Mainnet`);
    dim(`Version: 1.0.0`);
  } else {
    return;
  }

  const { getNamedAccounts, ethers } = hardhat;
  const { deployer, defenderRelayer } = await getNamedAccounts();

  
  // ===================================================
  //                 Deploy Contracts                 //
  // ===================================================

  const preMarket: Contract = await deployAndVerify(
    "PreMarket",
    [
      process.env.ASX_NAME?.trim() || "Flare Governance Token",
      process.env.ASX_SYMBOL?.trim() || "ASX",
      BigInt(process.env.ASX_CAP?.trim() || ethers.parseEther("100000000")),
      process.env.ASX_INITIAL_SUPPLY_RECEIVER?.trim() || deployer,
    ],
    false
  );
 
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
