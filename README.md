# Web3.js
Smart contract compilation and deploy using web3.js from vscode.

There is an issue with the file web_new.js
While trying to fetch the abi and bytecode probably there is some problem with the method written which is giving error while compilation.

ABI= output.contracts["demo.sol"]["demo"].abi;//fetching abi
bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object; //fetching bytecode

