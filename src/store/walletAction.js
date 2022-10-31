import { getAlgodClient, sendRawTransaction, verifyAttachedCertificate, verifyCertificateAuthenticity } from 'api/backoperations/algo.service';
import { WALLET_CONSTANTS } from 'utils/global-constants';
import * as type from './actions';

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
    console.log(certificate);
  
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
    let certificateId = certificate.id;
    const algodClientInfo = (await getAlgodClient({network, sender, certificateId})).data;

    let txn = algodClientInfo.lsig;


   
    const AlgoSigner = window.AlgoSigner;

    if (typeof AlgoSigner !== "undefined") {
        try {
            txn = objectToUint8Array(txn);
            
            let base64Tx = AlgoSigner.encoding.msgpackToBase64(txn);

            let signedTxs = await AlgoSigner.signTxn([
                {
                    txn: base64Tx,
                },
            ]);

            let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(
                signedTxs[0].blob
            );

            const response = await sendRawTransaction(certificateId ,signedTxs[0].blob);

            return response;
        } catch (err) {
            console.error(err);
        }
    }
}

const objectToUint8Array = (object) => {
    const length = Object.keys(object).length;
    const uint8Array = new Uint8Array(new ArrayBuffer(length));
    for (let i = 0; i < length; i++) {
        uint8Array[i] = object[i];
    }
    return uint8Array;
}


export const verifyCertificateAuthenticityAction = (certificateId) => async (dispatch) => {
    return verifyCertificateAuthenticity(certificateId).then((response) => {
        if (response.status == 200 && response.data?.verified != undefined) {
            if (response.data.verified == true) {
                dispatch({
                    type: type.SET_MESSAGE,
                    payload: {
                        message: "Certificate verified Successfully",
                        type: "success"
                    }
                });
                return true;
            } else {
                dispatch({
                    type: type.SET_MESSAGE,
                    payload: {
                        message: "Certificate verification failed",
                        type: "error"
                    }
                });
                return false;
            }
        } else {
            dispatch({
                type: type.SET_MESSAGE,
                payload: {
                    message: response.data?.message ? response.data.message : "Sorry, something went wrong",
                    type: "error"
                }
            });
            return null;
        }
    });
}

export const verifyAttachedCertificateAction = (data) => async (dispatch) => {
    console.log("verifyAttachedCertificate");
    return verifyAttachedCertificate(data).then((response) => {
        if (response.status == 200 && response.data?.verified != undefined) {
            if (response.data.verified == true) {
                console.log("Certificate verified Successfully");
                dispatch({
                    type: type.SET_MESSAGE,
                    payload: {
                        message: "Certificate verified Successfully",
                        type: "success"
                    }
                });
                return true;
            } else {
                console.log("Certificate verification failed");
                dispatch({
                    type: type.SET_MESSAGE,
                    payload: {
                        message: "Certificate verification failed",
                        type: "error"
                    }
                });
                return false;
            }
        } else {
            console.log("Sorry, something went wrong");
            dispatch({
                type: type.SET_MESSAGE,
                payload: {
                    message: response.response.data?.message ? response.response.data.message : "Sorry, something went wrong",
                    type: "error"
                }
            });
            return null;
        }
    });
}