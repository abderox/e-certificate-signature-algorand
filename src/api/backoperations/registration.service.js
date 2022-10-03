import axios from 'axios';
import {API_AUTH_URLS} from 'utils/global-constants';


const register = (data) => {
    return axios.post(API_AUTH_URLS.REGISTER, data);
}

export  {
    register
}