import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import {API_ETABLISSEMENTS_URLS} from 'utils/global-constants';


const createEtablissment=(values) => {
    return axios.post(API_ETABLISSEMENTS_URLS.CREATE_ETABLISSEMENT,values, { headers: authHeader() });
}

const createFiliere = (values) => {
    return axios.post(API_ETABLISSEMENTS_URLS.CREATE_FILIERE,values, { headers: authHeader() });
}

const uploadLogo = (data) => {
    return axios.post(API_ETABLISSEMENTS_URLS.UPLOAD_LOGO, data,{ headers: authHeader() });
}

const getEtabs = () => {
    return axios.get(API_ETABLISSEMENTS_URLS.GET_ETABS, { headers: authHeader() });
}

export {
    createEtablissment,
    createFiliere,
    uploadLogo,
    getEtabs
}