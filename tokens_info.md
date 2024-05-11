### FUNCTION_NAME=registerAndDeploy logs

Deployed Token ID: 0xb3509ce826074fe5f8320cde984c4642ab1866db75cade2fa2760ebffd2e01e9,
Token Address: 0x49E6e2708b8f13819a3334DeBF4E8CB0730B835B,
Transaction Hash: 0x42f34892f6e9ec58a5ca718ce6189ae3477d530ce871b3f5d16ef0ff3d39868f,
salt: 0x8dff383a4cd6ea8244bfd003041cfc6922e3e2977e33c334e949b701e65dd3de,
Expected Token Manager Address: 0x02295732b318D3854364d96Acb569eF704b4DF56,

### FUNCTION_NAME=deployToRemoteChain logs

Transaction Hash: 0x3d098cc6de61a200c265d888e85021f0b7be9666e857f1955a3bdd54c57b22e4

### Script execution in order

1. FUNCTION_NAME=registerAndDeploy npx hardhat run newInterchainToken.js --network fantom
2. FUNCTION_NAME=deployToRemoteChain npx hardhat run newInterchainToken.js --network fantom
3. FUNCTION_NAME=transferTokens npx hardhat run newInterchainToken.js --network fantom

   Deployed Token ID: 0x9680c01bd53c5ab59cd16ae573554dcc623e9cef8fe6e164cd3499cb92d82ddd,
   Token Address: 0x9C7FDE1326bf7B95f1e8815baf38FdFe2998573F,
   Transaction Hash: 0x835a4d4f615155d344e4e9bdcff8dd8ab3f8d934c6cd38818100582e2bc95526,
   salt: 0x2a27a0745d3903de451292d6de4e58252235ef4a57a2e4673ac5147055dfbaa3,
   Expected Token Manager Address: 0x22392E41F10bFa7fbe4e2acF9014027dc6817a8D,
