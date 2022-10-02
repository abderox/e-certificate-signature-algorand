import { createStore ,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import thunk from "redux-thunk";
const middleware = [thunk]
// ==============================|| REDUX - MAIN STORE ||============================== //


export default createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)));
