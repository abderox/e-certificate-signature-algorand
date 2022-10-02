
import * as type from './actions';

const initialState = {};
export default (state = initialState, action) => {

    switch (action.type) {
        case type.SET_MESSAGE:
            return {
                message: JSON.stringify(action.payload)
            }
        case type.CLEAR_MESSAGE:
            return {
                message: null
            }
        default:
            return state;
    }
}
