import { login, logout } from 'api/auth/auth.service';
import * as type from './actions';



const loginAction = (data) => (dispatch) => {
    return login(data).then(
        (data) => {
            dispatch({
                type: type.LOGIN_SUCCESS,
                payload: data,
            });
            console.log("loginAction: ", data);
            return Promise.resolve();
        },
        (error) => {
            console.log("loginAction: ", error.response.data.message);
            const message = error.response.data.message || error;
            dispatch({
                type: type.LOGIN_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

const logoutAction = () => (dispatch) => {
    logout();
    dispatch({
        type: type.LOGOUT_SUCCESS,
    });
}

export { loginAction, logoutAction };