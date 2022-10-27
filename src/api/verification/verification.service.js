import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import { VERIFICATION_URLS} from 'utils/global-constants';


const getGeneralInfo = (hash) => {
    return axios.get(VERIFICATION_URLS.GET_GENERAL_INFO, { params: { hash : hash} });
}



export {
    getGeneralInfo
}