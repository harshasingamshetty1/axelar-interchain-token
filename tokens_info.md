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

### Polygon mainnet BBird token

Deployed Token ID: 0xa9f7a4f0394f449ad51a03575d93f9847110a750a1384c22a9d568e384d0487a,
Token Address: 0x78a20BCb1293f4f291fdd05502100B478eBcc2fC,
Transaction Hash: 0xcbac68888742dfdbe628d9a7a251457eaf35d727d923ccf5a3cae9ea119f5c3f,
salt: 0x7c4194156ae1a64805843348b4f920065c0715116370f2a06569f9540a2a1eb7,
Expected Token Manager Address: 0x90BF0Fd7D1002edb1a68D51E83Cc97729c69781D,
