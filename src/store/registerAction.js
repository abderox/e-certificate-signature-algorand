import * as type from './actions';

import { register } from 'api/backoperations/registration.service';

const registerAction = (data,who) => (dispatch) => {
    return register(data,who).then(
        (res) => {
            dispatch({
                type: type.REGISTER_SUCCESS,
                payload: res.data.message,
            });
            console.log("registerAction: ", res.data.message);
            return Promise.resolve();
        },
        (error) => {
            console.log("registerAction: ", error.response.data.message);
            const message = error.response.data.message || error;
            dispatch({
                type: type.REGISTER_FAIL,
            });
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



export { registerAction };