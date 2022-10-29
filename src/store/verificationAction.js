import {getGeneralInfo} from 'api/verification/verification.service';
import * as type from './actions';


const getGeneralInfoAction = (hash) => (dispatch) => {
    return getGeneralInfo(hash).then(
        (data) => {
            dispatch({
                type: type.SET_GENERAL_INFO,
                payload: data.data,
            });
            return Promise.resolve(data.data);
        },
        (error) => {
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: {
                    message: message,
                    type: "error"
                },
            });
            return Promise.reject(error);
        }
    );
}

export { getGeneralInfoAction };