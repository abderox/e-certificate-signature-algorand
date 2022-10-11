import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import {API_CERTIFICATE_URLS} from 'utils/global-constants';


const generateCertificates = (data) => {
    return axios.post(API_CERTIFICATE_URLS.GENERATE_CERTIFICATES, data, { headers: authHeader() });
}

export  {
    generateCertificates
}