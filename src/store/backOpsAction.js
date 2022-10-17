import { generateCertificates } from 'api/backoperations/certificate.service';
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
                payload: {
                    message: message,
                    type: "error"
                },
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
                payload: {
                    message: message,
                    type: "error"
                },
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

const generateCertificatesAction = (data) => (dispatch) => {
    return generateCertificates(data).then(
        (res) => {
            dispatch({
                type: type.SET_MESSAGE,
                payload: {
                    message: res.data.message,
                    type: "success"
                },
            });
            console.log("generateCertificatesAction: ", res.data.message);
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: {
                    message: message,
                    type: "error"
                },
            });
            return Promise.reject(error);
        }
    );
}

export { getAllFilieresAction, setFiliere, getAllEtudiantsAction, setEtudiantsAction, generateCertificatesAction };