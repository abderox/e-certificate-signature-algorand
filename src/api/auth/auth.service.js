import axios from 'axios';
import {API_AUTH_URLS} from 'utils/global-constants';


const login = (data) => {
    return axios
        .post(API_AUTH_URLS.LOGIN, data)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem("user");
}



export  {
    login,
    logout    
}