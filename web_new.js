solc=require("solc");//brought the solc compiler to compile solidity

fs=require("fs");//require to read and write other files in this case demo.sol as we are compiling it from web_new.js

let {Web3}= require("web3");
let web3= new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));//brought ganache to deploy in it



let fileContent = fs.readFileSync("demo.sol").toString();// reading the file contents of the smart  contract ie demo.sol
console.log(fileContent);//printing the filecontent to check

// create an input structure for my solidity compiler
var input = {
    language: "Solidity",
    sources: {
      "demo.sol": {
        content: fileContent,
      },
    },
  
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

let output = JSON.parse(solc.compile(JSON.stringify(input)));//converting the output to jSON format
console.log("Output: ", output);

ABI= output.contracts["demo.sol"]["demo"].abi;//fetching abi
bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object; //fetching bytecode
console.log("Bytecode: ", bytecode);
console.log("ABI: ", ABI);

contract = new web3.eth.Contract(ABI);//creating an instance of the contract and passing the abi
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  console.log("Accounts:", accounts); //it will show all the ganache accounts

  defaultAccount = accounts[0];//the account from which the contract is going to get deployed 
  console.log("Default Account:", defaultAccount);  //to deploy the contract from default Account
  contract
    .deploy({ data: bytecode })//deploying the contract with the bytecode
    .send({ from: defaultAccount, gas: 470000 })
    .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain and stored in receipt
      console.log("Contract Address:", receipt.contractAddress);
    })
    .then((demoContract) => {
      demoContract.methods.x().call((err, data) => {//calling the function x from demo.sol
        console.log("Initial Value:", data);//returns the value which has been set
      });
    });
  
});


  


