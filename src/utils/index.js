import axios from 'axios';

export const addressMAC = () => {

    return axios.get('http://localhost:7002/api/mac').then((response) => {
        console.log(response.data.mac);
        return response.data.mac;
    }).catch(() => {
        return "00:00:00:00:00:00";
    });

}