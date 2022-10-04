import * as type from './actions';
const initialState = {
    filieres: [],
};

const getAllFilieresReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_FILIERES:
            return {
                ...state,
                filieres: action.payload,
            }
        default:
            return state;
    }
}

export { getAllFilieresReducer };