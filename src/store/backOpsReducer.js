import * as type from './actions';
const initialState = {
    filieres: [],
    filiere: {},
    etudiants: [],
    nombreEtudiants: 0,
    certificats: [],
    directSign: false,
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
                etudiants: action.payload.rows,
                nombreEtudiants: action.payload.count,
            }
        case type.SET_CERTIFICATS:
            return {
                ...state,
                certificats: action.payload,
            }
        case type.SET_DIRECT_SIGN:
            return {
                ...state,
                directSign: action.payload,
            }
        default:
            return state;
    }
}
