import * as type from './actions';


const initialState = {
    myProfile: null,
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case type.GET_PRIVATE_PROFILE_STUDENT_SUCCESS:
            return {
                ...state,
                myProfile: actions.payload
            }
        case type.GET_PRIVATE_PROFILE_STUDENT_FAIL:
            return {
                ...state,
                myProfile: null
            }
        default:
            return state;
    }
}