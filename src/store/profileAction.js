import { getProfileStudent , getPrivateProfileStudent } from 'api/profile/profile.service';
import * as type from './actions';


const getProfileStudentAction = (data) => (dispatch) => {
    return getProfileStudent(data).then(
        (res) => {
            dispatch({
                type: type.GET_PROFILE_STUDENT_SUCCESS,
                payload: res.data,
            });
            console.log("getProfileStudentAction: ", res.data);
            return Promise.resolve(res.data);
        },
        (error) => {
           
            const message = error.response.data.message || error;
            dispatch({
                type: type.GET_PROFILE_STUDENT_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

const getPrivateProfileStudentAction = (data) => (dispatch) => {
    return getPrivateProfileStudent(data).then(
        (res) => {
            dispatch({
                type: type.GET_PRIVATE_PROFILE_STUDENT_SUCCESS,
                payload: res.data,
            });
            console.log("getPrivateProfileStudentAction: ", res.data);
            return Promise.resolve(res.data);
        },
        (error) => {
           
            const message = error.response.data.message || error;
            dispatch({
                type: type.GET_PRIVATE_PROFILE_STUDENT_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}



export {
    getProfileStudentAction,
    getPrivateProfileStudentAction
}