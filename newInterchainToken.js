const hre = require("hardhat");
const crypto = require("crypto");
const ethers = hre.ethers;
const {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} = require("@axelar-network/axelarjs-sdk");

const interchainTokenServiceContractABI = require("./utils/interchainTokenServiceABI");
const interchainTokenFactoryContractABI = require("./utils/interchainTokenFactoryABI");
const interchainTokenContractABI = require("./utils/interchainTokenABI");

const interchainTokenServiceContractAddress =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";
const interchainTokenFactoryContractAddress =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";

const SOURCE_CHAIN = EvmChain.FANTOM;
const DESTINATION_CHAIN = EvmChain.CELO;
// // Set Salt value from registerAndDeploy()
// const SALT =
//   "0x256f05b979b62392a70aaa1a1a76ca56a58dea338ab6122f694a327a17783c44";

async function getSigner() {
  const [signer] = await ethers.getSigners();
  return signer;
}

async function getContractInstance(contractAddress, contractABI, signer) {
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// Register and deploy a new interchain token to the Fantom testnet
async function registerAndDeploy() {
  // Generate random salt
  const salt = "0x" + crypto.randomBytes(32).toString("hex");

  // Create a new token
  const name = "Axelar BB";
  const symbol = "ABB";
  const decimals = 18;

  // Intial token supply
  const initialSupply = ethers.utils.parseEther("1000000000");

  // Get a signer to sign the transaction
  const signer = await getSigner();

  // Create contract instances
  const interchainTokenFactoryContract = await getContractInstance(
    interchainTokenFactoryContractAddress,
    interchainTokenFactoryContractABI,
    signer
  );
  const interchainTokenServiceContract = await getContractInstance(
    interchainTokenServiceContractAddress,
    interchainTokenServiceContractABI,
    signer
  );

  // Generate a unique token ID using the signer's address and salt
  const tokenId = await interchainTokenFactoryContract.interchainTokenId(
    signer.address,
    salt
  );

  // Retrieve new token address
  const tokenAddress =
    await interchainTokenServiceContract.interchainTokenAddress(tokenId);

  // Retrieve token manager address
  const expectedTokenManagerAddress =
    await interchainTokenServiceContract.tokenManagerAddress(tokenId);

  // Deploy new Interchain Token
  const deployTxData =
    await interchainTokenFactoryContract.deployInterchainToken(
      salt,
      name,
      symbol,
      decimals,
      initialSupply,
      signer.address
    );

  console.log(
    `
    Deployed Token ID: ${tokenId},
    Token Address: ${tokenAddress},
    Transaction Hash: ${deployTxData.hash},
    salt: ${salt},
    Expected Token Manager Address: ${expectedTokenManagerAddress},
       `
  );
}

const api = new AxelarQueryAPI({ environment: Environment.TESTNET });

// Estimate gas costs.
async function gasEstimator() {
  const gas = await api.estimateGasFee(
    SOURCE_CHAIN,
    DESTINATION_CHAIN,
    GasToken.FTM,
    700000,
    1.1
  );

  return gas;
}

// Deploy to remote chain: Polygon
async function deployToRemoteChain() {
  // Get a signer for authorizing transactions
  const signer = await getSigner();
  // Get contract for remote deployment
  const interchainTokenFactoryContract = await getContractInstance(
    interchainTokenFactoryContractAddress,
    interchainTokenFactoryContractABI,
    signer
  );

  // Estimate gas fees
  const gasAmount = await gasEstimator();

  // Set Salt value from registerAndDeploy()
  const salt =
    "0x1ed1167cfe3ef124a89d5ab4161051abb3210e467dd6cdbc77f2ab4d96d098c4";

  // Initiate transaction
  const txn = await interchainTokenFactoryContract.deployRemoteInterchainToken(
    "Fantom",
    salt,
    signer.address,
    "celo",
    gasAmount,
    { value: gasAmount }
  );

  console.log(`Transaction Hash: ${txn.hash}`);
}

async function transferTokens() {
  // Get signer
  const signer = await getSigner();

  const interchainToken = await getContractInstance(
    "0xc028ebdF906a890be73C594b6a14858D0552544A", // Update with new token address
    interchainTokenContractABI, // Interchain Token contract ABI
    signer
  );

  // Calculate gas amount
  const gasAmount = await gasEstimator();

  // Initate transfer via token
  const transfer = await interchainToken.interchainTransfer(
    "Polygon", // Destination chain
    "0x510e5EA32386B7C48C4DEEAC80e86859b5e2416C", // Update with your own wallet address
    ethers.utils.parseEther("25"), // Transfer 25 tokens
    "0x", // Empty data payload
    { value: gasAmount } // Transaction options
  );
  console.log("Transfer Transaction Hash:", transfer.hash);
}

async function main() {
  const functionName = process.env.FUNCTION_NAME;
  switch (functionName) {
    case "registerAndDeploy":
      await registerAndDeploy();
      break;
    case "deployToRemoteChain":
      await deployToRemoteChain();
      break;
    case "transferTokens":
      await transferTokens();
      break;
    default:
      console.error(`Unknown function: ${functionName}`);
      process.exitCode = 1;
      return;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
