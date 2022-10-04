import axios from 'axios';
import {API_FILIERE_URLS} from 'utils/global-constants';


const getAllFilieres = (etablissement = "FSTG") => {
    return axios.get(API_FILIERE_URLS.GET_ALL_FILIERES, { params: { etablissement } });
}

export  {
    getAllFilieres
}