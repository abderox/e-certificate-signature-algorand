import * as type from './actions';

const initialState = {
    address: null,
    wallet: null,
    walletAuthToken: typeof localStorage !== "undefined" ? localStorage.getItem("walletAuthToken") || null : null,
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ACCOUNT_ADDRESS:
            console.log("set account address");
            console.log(action.payload);
            return {
                ...state,
                address: action.payload.address,
                wallet: action.payload.wallet,
            }
        case type.SET_WALLET_AUTH_TOKEN:
            return {
                ...state,
                walletAuthToken: action.payload,
            }
        default:
            return state;
    }
}