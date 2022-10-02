import * as type from './actions';
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: JSON.parse(localStorage.getItem('user')) ? true : false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case type.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        case type.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}
