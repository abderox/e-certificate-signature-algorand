
import * as type from './actions';

const initialState = {
    message: null,
    type: null,
};
export default (state = initialState, action) => {

    switch (action.type) {
        case type.SET_MESSAGE:
            return {
                message: JSON.stringify(action.payload.message),
                type: action.payload.type
            }
        case type.CLEAR_MESSAGE:
            return {
                message: null,
                type: null
            }
        default:
            return state;
    }
}
