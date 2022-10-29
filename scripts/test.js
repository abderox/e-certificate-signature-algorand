// require("dotenv").config();
// const algosdk = require("algosdk");
// const fs = require("fs");
// const path = require("path");

// const algodClient = new algosdk.Algodv2(
//   process.env.ALGOD_TOKEN,
//   process.env.ALGOD_SERVER,
//   process.env.ALGOD_PORT
// );

// const testnetClient = new algosdk.Algodv2(
//     process.env.ALGOD_TOKEN_TESTNET,
//     process.env.ALGOD_SERVER_TESTNET,
//     process.env.ALGOD_PORT_TESTNET
// );

// // const submitToNetworkTestnet = async (signedTxn) => {
// //     const tx = (await testnetClient.sendRawTransaction(signedTxn.blob).do());
// //     console.log("Transaction : " + tx.txId);
// //     return tx.txId;
// // }

// // const testNetwork = async () => {
// //     const params = await algodClient.getTransactionParams().do();
// //     const endRound = params.lastRound + parseInt(1000);
// //     const txn = {
// //         type: "pay",
// //         from: process.env.ADDR_CREATOR,
// //         to: process.env.ACC1_ADDR,
// //         amount: 100000,
// //         firstRound: params.lastRound,
// //         lastRound: endRound,
// //         genesisID: params.genesisID,
// //         genesisHash: params.genesishashb64,
// //     };
// //     const signedTxn = algosdk.signTransaction(txn, process.env.MNEMONIC_CREATOR);
// //     const tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
// //     console.log("Transaction : " + tx.txId);
// // };

// // Accounts used
// const master = algosdk.mnemonicToSecretKey(process.env.MNEMONIC_CREATOR);
// const receiver = algosdk.mnemonicToSecretKey(process.env.ACC2_MNEMONIC);
// const acc1 = algosdk.mnemonicToSecretKey(process.env.ACC1_MNEMONIC);

// const submitToNetwork = async (signedTxn) => {
//   // send txn
//   let tx = await algodClient.sendRawTransaction(signedTxn).do();
//   console.log("Transaction : " + tx.txId);

//   // Wait for transaction to be confirmed
//   confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);

//   //Get the completed Transaction
//   console.log(
//     "Transaction " +
//       tx.txId +
//       " confirmed in round " +
//       confirmedTxn["confirmed-round"]
//   );

//   return confirmedTxn;
// };

// const fundAccount = async (receiver, amount) => {
//   // create suggested parameters
//   const suggestedParams = await algodClient.getTransactionParams().do();

//   let txn = algosdk.makePaymentTxnWithSuggestedParams(
//     master.addr,
//     receiver.addr,
//     amount,
//     undefined,
//     undefined,
//     suggestedParams
//   );

//   // sign the transaction
//   const signedTxn = txn.signTxn(master.sk);

//   return await submitToNetwork(signedTxn);
// };

// (async () => {
//   // Compile to TEAL
//   const filePath = path.join(__dirname, "../artifacts/stateless_sc.teal");
//   const data = fs.readFileSync(filePath);
//   const compiledProgram = await algodClient.compile(data).do();

//   // Fund the stateless smart contract with 10 Algos so it becomes a contract account
//   const programBytes = new Uint8Array(Buffer.from(compiledProgram.result, "base64"));
//   const lsig = new algosdk.LogicSigAccount(programBytes);
//   await fundAccount({addr: lsig.address()}, 1e7);
//   console.log("Contract account address:", lsig.address());

//   // get suggested parameters
//   let suggestedParams = await algodClient.getTransactionParams().do();

//   // send Algos using contract account
//   const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
//     from: lsig.address(),
//     to: receiver.addr,
//     amount: 1e6, // send 1 Algo
//     suggestedParams,
//   });

//   // sign with logic signature
//   const lstx = algosdk.signLogicSigTransactionObject(txn, lsig);

//   await submitToNetwork(lstx.blob);

//   // check contract account balance
//   contractAccountObj = await algodClient.accountInformation(lsig.address()).do();
//   console.log("Contract account balance:", contractAccountObj.amount);
// })();


// // import dotenv from "dotenv";
// // // const dotenv = require("dotenv");
// // dotenv.config();

// // // import { loadAccountsFromFileSync } from "@algo-builder/algob";
// // // const { loadAccountsFromFileSync } = require("@algo-builder/algob");
// // // const accFromFile = loadAccountsFromFileSync("assets/accounts_generated.yaml");
// // // accounts = accounts.concat(accFromFile);


// // export default async function run(runtimeEnv, deployer) {
// //     const master = deployer.accountsByName.get("master");
// //     const approvalFile = "sc_approval.py";
// //     const clearStateFile = "sc_clearstate.py";

// //     await deployer.

// //     // get app info
// //     const app = deployer.getApp(approvalFile, clearStateFile);
// //     console.log(app);
// //     const appAddress = app.applicationAccount;

// //     let globalState = await readAppGlobalState(deployer, master.addr, app.appID);
// //     console.log(globalState);

// //     // testnet explorer url
// //     console.log("TestNet Explorer URL: ", `https://testnet.algoexplorer.io/application/${app.appID}`);
// // }


















// ///////////////////////---------------------------------------------------this
// const algosdk = require('algosdk');
// const dotenv = require('dotenv');
// dotenv.config();

// // Retrieve the token, server and port values for your installation in the 
// // algod.net and algod.token files within the data directory

// // UPDATE THESE VALUES
// // const token = "TOKEN";
// // const server = "SERVER";
// // const port = PORT;

// // sandbox
// const token = { "X-API-Key": process.env.ALGOD_TOKEN_TESTNET };
// const server = process.env.ALGOD_ADDR_TESTNET;
// const port = process.env.ALGOD_PORT_TESTNET;

// // Function used to wait for a tx confirmation
// const waitForConfirmation = async function (algodclient, txId) {
//     let response = await algodclient.status().do();
//     let lastround = response["last-round"];
//     while (true) {
//         const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
//         if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
//             //Got the completed Transaction
//             console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
//             break;
//         }
//         lastround++;
//         await algodclient.statusAfterBlock(lastround).do();
//     }
// };


// // Function used to print created asset for account and assetid
// const printCreatedAsset = async function (algodclient, account, assetid) {
//     // note: if you have an indexer instance available it is easier to just use this
//     //     let accountInfo = await indexerClient.searchAccounts()
//     //    .assetID(assetIndex).do();
//     // and in the loop below use this to extract the asset for a particular account
//     // accountInfo['accounts'][idx][account]);
//     let accountInfo = await algodclient.accountInformation(account).do();
//     for (idx = 0; idx < accountInfo['created-assets'].length; idx++) {
//         let scrutinizedAsset = accountInfo['created-assets'][idx];
//         if (scrutinizedAsset['index'] == assetid) {
//             console.log("AssetID = " + scrutinizedAsset['index']);
//             let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
//             console.log("parms = " + myparms);
//             break;
//         }
//     }
// };
// // Function used to print asset holding for account and assetid
// const printAssetHolding = async function (algodclient, account, assetid) {
//     // note: if you have an indexer instance available it is easier to just use this
//     //     let accountInfo = await indexerClient.searchAccounts()
//     //    .assetID(assetIndex).do();
//     // and in the loop below use this to extract the asset for a particular account
//     // accountInfo['accounts'][idx][account]);
//     let accountInfo = await algodclient.accountInformation(account).do();
//     for (idx = 0; idx < accountInfo['assets'].length; idx++) {
//         let scrutinizedAsset = accountInfo['assets'][idx];
//         if (scrutinizedAsset['asset-id'] == assetid) {
//             let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
//             console.log("assetholdinginfo = " + myassetholding);
//             break;
//         }
//     }
// };

// // Recover accounts
// // paste in mnemonic phrases here for each account

// var account1_mnemonic = process.env.MNEMONIC_CREATOR_TESTNET;
// var account2_mnemonic = process.env.ACC1_MNEMONIC_TESTNET
// // var account3_mnemonic = "PASTE your phrase for account 3"

// var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
// var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
// // var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
// console.log(recoveredAccount1.addr);
// console.log(recoveredAccount2.addr);
// // console.log(recoveredAccount3.addr);

// // Instantiate the algod wrapper
// let algodclient = new algosdk.Algodv2(token, server, port);

// // Debug Console should look similar to this

// // THQHGD4HEESOPSJJYYF34MWKOI57HXBX4XR63EPBKCWPOJG5KUPDJ7QJCM  
// // AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU   
// // 3ZQ3SHCYIKSGK7MTZ7PE7S6EDOFWLKDQ6RYYVMT7OHNQ4UJ774LE52AQCU   


// (async () => {
//     // Asset Creation:
//     // The first transaction is to create a new asset
//     // Get last round and suggested tx fee
//     // We use these to get the latest round and tx fees
//     // These parameters will be required before every 
//     // Transaction
//     // We will account for changing transaction parameters
//     // before every transaction in this example
//     console.log("hi")

//     console.log(server)
//     console.log(port)
//     console.log(token)
//     let params = await algodclient.getTransactionParams().do();
//     //comment out the next two lines to use suggested fee
//     params.fee = 1000;
//     params.flatFee = true;
//     console.log(params);

//     let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored

//     // Asset creation specific parameters
//     // The following parameters are asset specific
//     // Throughout the example these will be re-used. 
//     // We will also change the manager later in the example
//     let addr = recoveredAccount1.addr;
//     // Whether user accounts will need to be unfrozen before transacting    
//     let defaultFrozen = false;
//     // integer number of decimals for asset unit calculation
//     let decimals = 0;
//     // total number of this asset available for circulation   
//     let totalIssuance = 1000;
//     // Used to display asset units to user    
//     let unitName = "Certif";
//     // Friendly name of the asset    
//     let assetName = "Certificate";
//     // Optional string pointing to a URL relating to the asset
//     let assetURL = "http://certificate.ma";
//     // Optional hash commitment of some sort relating to the asset. 32 character length.
//     let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
//     // The following parameters are the only ones
//     // that can be changed, and they have to be changed
//     // by the current manager
//     // Specified address can change reserve, freeze, clawback, and manager
//     let manager = recoveredAccount2.addr;
//     // Specified address is considered the asset reserve
//     // (it has no special privileges, this is only informational)
//     let reserve = recoveredAccount2.addr;
//     // Specified address can freeze or unfreeze user asset holdings 
//     let freeze = recoveredAccount2.addr;
//     // Specified address can revoke user asset holdings and send 
//     // them to other addresses    
//     let clawback = recoveredAccount2.addr;

//     console.log("hi1")
//     // signing and sending "txn" allows "addr" to create an asset
//     let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
//         totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
//         clawback, unitName, assetName, assetURL, assetMetadataHash, params);

//     let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)
//     let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
//     console.log("Transaction : " + tx.txId);
//     let assetID = null;
//     console.log("hi2")

//     // wait for transaction to be confirmed
//     await waitForConfirmation(algodclient, tx.txId);
//     console.log("hi3")

//     // Get the new asset's information from the creator account
//     let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
//     assetID = ptx["asset-index"];
//     // console.log("AssetID = " + assetID);
//     console.log("hi4")

//     await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);
//     await printAssetHolding(algodclient, recoveredAccount1.addr, assetID);
// })().catch(e => {
//     console.log(e);
//     console.trace();
// });

// // (async () => {
// //     await printCreatedAsset(algodclient, recoveredAccount1.addr, "118406343");
// // })();

