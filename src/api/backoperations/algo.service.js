import axios from 'axios';
import {API_ALGO_URLS} from 'utils/global-constants';

const getAlgodClient = (data) => {
    return axios.post(API_ALGO_URLS.GET_ALGO_CLIENT , { network: data.network, sender: data.sender, certificateId: data.certificateId });
}

const sendRawTransaction = (certificateId, binarySignedTx) => {
    return axios.post(API_ALGO_URLS.SEND_RAW_TRANSACTION , {certificateId, binarySignedTx});
}

export  {
    getAlgodClient,
    sendRawTransaction
}