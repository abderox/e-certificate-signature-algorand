import * as type from './actions';



const initialState = {
    generalInfo: null,
    message: {
        type: "",
        message: ""
    }
};

export default (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case type.SET_GENERAL_INFO:
            return {
                ...state,
                generalInfo: payload
            };
        case type.SET_MESSAGE:
            return {
                ...state,
                message: payload
            };
        default:
            return state;
    }
}