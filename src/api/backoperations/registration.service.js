import axios from 'axios';
import {API_AUTH_URLS} from 'utils/global-constants';
import authHeader from '../auth/authHeaders.service'


const register = (data,who) => {
    if(who === 'admin'){
        return axios.post(API_AUTH_URLS.REGISTER_ADMIN, data, { headers: authHeader() });
    }
    else if(who === 'student'){
        return axios.post(API_AUTH_URLS.REGISTER_STUDENT, data, { headers: authHeader() }); 
    }
}

export  {
    register
}