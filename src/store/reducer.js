import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import  login from './authReducer';
import message from './messageReducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    login,
    message
});

export default reducer;
