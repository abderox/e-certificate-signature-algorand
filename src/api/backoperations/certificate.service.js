import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import {API_CERTIFICATE_URLS} from 'utils/global-constants';


const generateCertificates = (data) => {
    return axios.post(API_CERTIFICATE_URLS.GENERATE_CERTIFICATES, data, { headers: authHeader() });
}

const getAllCertificatsByFiliere = (filiere) => {
    return axios.get(API_CERTIFICATE_URLS.GET_ALL_CERTIFICATS_BY_FILIERE, { params: { filiere }, headers: authHeader() });
}

export  {
    generateCertificates,
    getAllCertificatsByFiliere
}