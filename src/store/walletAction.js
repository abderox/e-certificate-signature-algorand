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
        payload: payload,
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
