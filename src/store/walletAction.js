import { getAlgodClient, sendRawTransaction } from 'api/backoperations/algo.service';
import { WALLET_CONSTANTS } from 'utils/global-constants';
import * as type from './actions';
import algosdk from 'algosdk';
import { LogicSig } from '@algo-builder/runtime/build/logicsig';

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

export const signCertificateAction = (certificate, walletInfo) => async (dispatch) => {

    console.log("signCertificate");
  
    let sender = walletInfo.address;
    let connection = walletInfo.wallet;
    
    console.log(connection)

    let txnResponse = null;

    switch (connection) {
        case WALLET_CONSTANTS.ALGO_SIGNER:
            console.log("ALGO_SIGNER");
            txnResponse = await sendAlgoSignerTransaction(WALLET_CONSTANTS.TESTNET, 1, sender, certificate)
            break;
    
        default:
            break;
    }
    
    if (txnResponse) {
        dispatch({
            type: type.SIGN_CERTIFICATE,
            payload: txnResponse.data.txId,
        });
        dispatch({
            type: type.SET_MESSAGE,
            payload: {
                message: "Certificate signed",
                type: "success"
            }
        });
    }

    else {
        dispatch({
            type: type.SET_MESSAGE,
            payload: {
                message: "Transaction failed",
                type: "error"
            }
        });
    }
}


const sendAlgoSignerTransaction = async (network, assetAmount, sender, certificate) => {
    console.log("sendAlgoSignerTransaction");
    console.log(certificate);
    const algodClientInfo = (await getAlgodClient({network, sender})).data;

    console.log(algodClientInfo);

    let params = algodClientInfo.params;
    console.log(params);
    assetAmount = parseInt(assetAmount);

    params.fee = 1000;
    params.flatFee = true;
    console.log(params);

    let note = undefined;

    let address = sender;

    let defaultFrozen = false;

    let decimals = 0;

    let total = 1;

    let unitName = "Certif";
    
    let assetName = "Certificate";

    let assetURL = "http://certificate.ma";

    let assetMetadataHash = new Uint8Array();
    console.log(assetMetadataHash)

    let manager = undefined;

    let reserve = undefined;
    
    let freeze = undefined;
    
    let clawback = undefined;

    let lsig = algodClientInfo.lsig;

    console.log(lsig)

    
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(lsig, note,
        total, decimals, defaultFrozen, manager, reserve, freeze,
        clawback, unitName, assetName, assetURL, assetMetadataHash, params);

    console.log(txn);

    let response = await sendAlgoSignerTransactionRaw(txn);

    console.log(response);

    return response;
}

const convertIpfsCidV0ToByte32 = (cid) => {
    const bytes = bs58.decode(cid).slice(2);
    const base64 = Buffer.from(bytes).toString("base64");
    const buffer = Buffer.from(base64, "base64");

    return { base64, buffer };
};

const stringToUint8Array = (string) => {
    const uint8Array = new Uint8Array(new ArrayBuffer(string.length));
    for (let i = 0; i < string.length; i++) {
        uint8Array[i] = string.charCodeAt(i);
    }
    return uint8Array;
}

const uint8ArrayToString = (uint8Array) => {
    const encodedString = String.fromCharCode.apply(null, uint8Array);
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
    
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}

const sendAlgoSignerTransactionRaw = async (txn) => {
    const AlgoSigner = window.AlgoSigner;

    if (typeof AlgoSigner !== "undefined") {
        try {
            console.log(txn);
            let binaryTx = txn.toByte();
            let base64Tx = AlgoSigner.encoding.msgpackToBase64(binaryTx);

            let signedTxs = await AlgoSigner.signTxn([
                {
                    txn: base64Tx,
                },
            ]);

            let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(
                signedTxs[0].blob
            );

            console.log(binarySignedTx);
            const response = await sendRawTransaction(signedTxs[0].blob);
            console.log(response);

            return response;
        } catch (err) {
            console.error(err);
        }
    }
}

