import { getAllFilieres } from 'api/backoperations/filiere.service';
import * as type from './actions';

const getAllFilieresAction = () => (dispatch) => {
    return getAllFilieres().then(
        (data) => {
            dispatch({
                type: type.SET_FILIERES,
                payload: data,
            });
            console.log("getAllFilieresAction: ", data);
            return Promise.resolve();
        },
        (error) => {
            console.log("getAllFilieresAction: ", error.response.data.message);
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

export { getAllFilieresAction };