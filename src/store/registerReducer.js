import * as type from './actions';

const initialState = {
    createdUser : ""
}

export default(state = initialState, action) => {
 
    switch (action.type) {
        case type.REGISTER_SUCCESS:
            return {
                ...state,
                createdUser: action.payload
            };
        case type.REGISTER_FAIL:
            return {
                ...state,
                createdUser: ""
            };
        case type.CLEAR_MESSAGE:
            return {
                ...state,
                createdUser: ""
            };
        default:
            return state;
    }
}