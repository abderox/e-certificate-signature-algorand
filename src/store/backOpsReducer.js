import * as type from './actions';
const initialState = {
    filieres: [],
    filiere: {},
    etudiants: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SET_FILIERES:
            return {
                ...state,
                filieres: action.payload,
            }
        case type.SET_FILIERE:
            return {
                ...state,
                filiere: action.payload,
            }
        case type.SET_ETUDIANTS:
            return {
                ...state,
                etudiants: action.payload,
            }
        default:
            return state;
    }
}
