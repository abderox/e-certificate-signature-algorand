import axios from 'axios';

export const addressMAC = (link) => {
  
    return axios.get(link+ '/api/mac').then((response) => {
        console.log(response.data.mac);
        return response.data.mac;
    })


}