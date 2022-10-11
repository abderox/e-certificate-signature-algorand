import { getAllEtudiants } from 'api/backoperations/etudiant.service';
import { getAllFilieres } from 'api/backoperations/filiere.service';
import * as type from './actions';

const getAllFilieresAction = () => (dispatch) => {
    return getAllFilieres().then(
        (data) => {
            dispatch({
                type: type.SET_FILIERES,
                payload: data.data.etablissement.filieres,
            });
            console.log("getAllFilieresAction: ", data.data.etablissement);
            return Promise.resolve();
        },
        (error) => {
            console.log("getAllFilieresAction: ", error.response.data.message);
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

const setFiliere = (filiere) => (dispatch) => {
    dispatch({
        type: type.SET_FILIERE,
        payload: filiere,
    });
}

const getAllEtudiantsAction = (options) => (dispatch) => {
    return getAllEtudiants(options).then(
        (data) => {
            dispatch({
                type: type.SET_ETUDIANTS,
                payload: data.data,
            });
            console.log("getAllEtudiantsAction: ", data.data);
            return Promise.resolve();
        },
        (error) => {
            console.log("getAllEtudiantsAction: ", error.response.data.message);
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

const setEtudiantsAction = (etudiants) => {
    console.log("setEtudiantsAction: ", etudiants);
    return {
        type: type.SET_ETUDIANTS,
        payload: etudiants,
    }
}


export { getAllFilieresAction, setFiliere, getAllEtudiantsAction, setEtudiantsAction };