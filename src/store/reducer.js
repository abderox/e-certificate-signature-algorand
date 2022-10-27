import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import  login from './authReducer';
import message from './messageReducer';
import register from './registerReducer';
import backops from './backOpsReducer';
import wallet from './walletReducer';
import profile from './profileReducer';
import privateProfile from './privateProfileReducer';
import verification from './verificationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    login,
    message,
    register,
    backops,
    wallet,
    profile,
    privateProfile,
    verification
});

export default reducer;
