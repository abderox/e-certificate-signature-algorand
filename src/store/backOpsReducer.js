import * as type from './actions';
const initialState = {
    filieres: [],
    filiere: {},
    etudiants: [],
    nombre_etudiants: 0,
    certificats: [],
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
                nombre_etudiants: action.payload.count,
            }
        case type.SET_CERTIFICATS:
            return {
                ...state,
                certificats: action.payload,
            }
        default:
            return state;
    }
}
