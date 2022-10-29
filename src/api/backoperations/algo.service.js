import axios from 'axios';
import {API_ALGO_URLS} from 'utils/global-constants';

const getAlgodClient = (network) => {
    return axios.post(API_ALGO_URLS.GET_ALGO_CLIENT , { params: { network } });
}


export  {
    getAlgodClient
}