import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import {API_ALGO_URLS} from 'utils/global-constants';

const getAlgodClient = (data) => {
    return axios.post(API_ALGO_URLS.GET_ALGO_CLIENT , { network: data.network, sender: data.sender, certificateId: data.certificateId });
}

const sendRawTransaction = (certificateId, binarySignedTx) => {
    return axios.post(API_ALGO_URLS.SEND_RAW_TRANSACTION , {certificateId, binarySignedTx});
}

const verifyCertificateAuthenticity = (certificateId) => {
    return axios.post(API_ALGO_URLS.VERIFY_CERTIFICATE_AUTHENTICITY, { certificateId });
}

const verifyAttachedCertificate = (formData) => {
    console.log("verifyAttachedCertificate");
    console.log(formData);
    return axios.post(API_ALGO_URLS.VERIFY_ATTACHED_CERTIFICATE, formData, { headers: authHeader() } );
}

export  {
    getAlgodClient,
    sendRawTransaction,
    verifyCertificateAuthenticity,
    verifyAttachedCertificate
}