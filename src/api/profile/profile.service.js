import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import { API_PROFILE } from 'utils/global-constants';


const getProfileStudent = (data) => {
    console.log("getProfileStudent: ", data);
    return axios.get(API_PROFILE.GET_PROFILE_STUDENT, { params: { cd_apg: data.code_apogee, cne: data.cne } });
}

const updateVisibility = (data) => {
    return axios.post(API_PROFILE.UPDATE_VISIBILITY, data, { headers: authHeader() });
}

export {
    getProfileStudent,
    updateVisibility
}
