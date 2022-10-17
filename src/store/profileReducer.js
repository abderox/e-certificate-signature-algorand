import * as type from './actions';


const initialState = {
    profile: null,
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case type.GET_PROFILE_STUDENT_SUCCESS:
            return {
                ...state,
                profile: actions.payload
            }
        case type.GET_PROFILE_STUDENT_FAIL:
            return {
                ...state,
                profile: null
            }
        default:
            return state;
    }
}