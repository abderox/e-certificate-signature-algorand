import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import { API_PROFILE } from 'utils/global-constants';


const getProfileStudent = (data) => {
    console.log("getProfileStudent: ", data);
    return axios.get(API_PROFILE.GET_PROFILE_STUDENT, { params: { cd_apg: data.code_apogee, cne: data.cne } });
}

const getPrivateProfileStudent = (data) => {
    return axios.get(API_PROFILE.GET_PRIVATE_PROFILE, { params: { cd_apg: data.code_apogee, cne: data.cne, user_id: data.user_id }, headers: authHeader() });
}


const updateVisibility = (data) => {
    return axios.post(API_PROFILE.UPDATE_VISIBILITY, data, { headers: authHeader() });
}

const uploadAvatar = (data, id) => {
    return axios.post(API_PROFILE.UPLOAD_AVATAR, data, { params: { id: id }, headers: authHeader() });
}

export {
    getProfileStudent,
    updateVisibility,
    getPrivateProfileStudent,
    uploadAvatar
}
