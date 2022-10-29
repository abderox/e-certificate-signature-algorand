import { getAlgodClient } from 'api/backoperations/algo.service';
import { WALLET_CONSTANTS } from 'utils/global-constants';
import * as type from './actions';
const algosdk = require('algosdk');

// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "algorand-walletconnect-qrcode-modal";
window.Buffer = window.Buffer || require("buffer").Buffer;

// export const connector = new WalletConnect({
//     bridge: "https://bridge.walletconnect.org",
//     qrcodeModal: QRCodeModal,
//   });

export const setAccountAddress = (payload) => (dispatch) => {
    dispatch({
        type: type.SET_ACCOUNT_ADDRESS,
        payload: {
            address: payload.address,
            wallet: payload.wallet,
            network: payload.network,
        },
    });
    dispatch({
        type: type.SET_MESSAGE,
        payload: {
            message: "Wallet connected",
            type: "success"
        }
    });
}

export const disconnectWallet = () => (dispatch) => {
    dispatch({
        type: type.SET_ACCOUNT_ADDRESS,
        payload: {
            address: null,
            wallet: null,
            network: null,
        },
    });
    dispatch({
        type: type.SET_MESSAGE,
        payload: {
            message: "Wallet disconnected",
            type: "success"
        }
    });
}


export const setWalletAuthToken = (walletAuthToken) => (dispatch) => {
    dispatch({
        type: type.SET_WALLET_AUTH_TOKEN,
        payload: walletAuthToken,
    });
}

export const signCertificate = (certificate, walletInfo) => async (dispatch) => {
    // await getAlgodClient(network).then(async (response) => {
    //     const algodClient = new algosdk.Algodv2(response.data.token, response.data.server, response.data.port);
    //     const params = await algodClient.getTransactionParams().do();
    //     const txn = {
    //         "from": address,
    //         "to": address,
    //         "fee": params.fee,
    //         "amount": 0,
    //         "firstRound": params.lastRound,
    //         "lastRound": params.lastRound + 1000,
    //         "genesisID": params.genesisID,
    //     }
    //     const signedTxn = await wallet.signTransaction(txn);
    //     const tx = (await algodClient.sendRawTransaction(signedTxn.blob).do());
    //     console.log("Transaction : " + tx.txId);
    //     dispatch({
    //         type: type.SIGN_CERTIFICATE,
    //         payload: tx.txId,
    //     });
    // });

    

    

    let sender = walletInfo.address;
    let connection = walletInfo.wallet;

    switch (connection) {
        case WALLET_CONSTANTS.ALGO_SIGNER:
            txn = await sendAlgoSignerTransaction(WALLET_CONSTANTS.TESTNET, 1, sender, certificate)
            break;
    
        default:
            break;
    }
    

    // return dispatch({
    //     type: type.SIGN_CERTIFICATE,
    //     payload: certificate,
    // });
}


const sendAlgoSignerTransaction = async (network, assetAmount, sender, certificate) => {
    const algodClientInfo = (await getAlgodClient(network)).data;

    console.log(algodClientInfo)
    
    let algodClient = new algosdk.Algodv2(algodClientInfo.token, algodClientInfo.server, algodClientInfo.port)

    console.log(algodClient);
    let params = await algodClient.getTransactionParams().do();
    assetAmount = parseInt(assetAmount)

    params.fee = 1000;
    params.flatFee = true;
    console.log(params);

    let note = undefined;
    // let note = certificate.User.nom + " certificate";

    let address = sender;

    let defaultFrozen = false;

    let decimals = 0;

    let total = 1;

    let unitName = "Certif";
    
    let assetName = "Certificate";

    let assetURL = "http://certificate.ma";

    let assetMetadataHash = "hash...";

    let manager = sender;

    let reserve = sender;
    
    let freeze = sender;
    
    let clawback = sender;

    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(address, note,
        total, decimals, defaultFrozen, manager, reserve, freeze,
        clawback, unitName, assetName, assetURL, assetMetadataHash, params);

    let response = await sendAlgoSignerTransactionRaw(txn, algodClient);

    console.log(response);
}

const sendAlgoSignerTransactionRaw = async (txn, algodClient) => {
    const AlgoSigner = window.AlgoSigner;

    if (typeof AlgoSigner !== "undefined") {
        try {
            // Get the binary and base64 encode it
            let binaryTx = txn.toByte();
            let base64Tx = AlgoSigner.encoding.msgpackToBase64(binaryTx);

            let signedTxs = await AlgoSigner.signTxn([
                {
                    txn: base64Tx,
                },
            ]);

            // Get the base64 encoded signed transaction and convert it to binary
            let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(
                signedTxs[0].blob
            );

            const response = await algodClient
                .sendRawTransaction(binarySignedTx)
                .do();
            console.log(response);

            return response;
        } catch (err) {
            console.error(err);
        }
    }
}