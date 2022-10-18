import axios from 'axios';
import {API_FILIERE_URLS} from 'utils/global-constants';
import authHeader from '../auth/authHeaders.service'

const getAllFilieres = (etablissement = "FSTG") => {
    return axios.get(API_FILIERE_URLS.GET_ALL_FILIERES, { params: { etablissement } , headers: authHeader()});
}

const getCertifiedFilieres = () => {
    return axios.get(API_FILIERE_URLS.GET_CERTIFIED_FILIERES, { headers: authHeader()});
}

export  {
    getAllFilieres,
    getCertifiedFilieres
}