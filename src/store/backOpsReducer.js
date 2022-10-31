import * as type from './actions';
const initialState = {
    filieres: [],
    filiere: {},
    etudiants: [],
    etudiants_to_certif: [],
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
                etudiants: action.payload.rows ? action.payload.rows : action.payload ? action.payload : [],
                nombreEtudiants: action.payload.count ? action.payload.count : action.payload ? action.payload.length : 0,
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
