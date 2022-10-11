import * as uploadService from 'api/backoperations/upload.service';
import * as type from './actions';

const importEtudiantExcelAction = (formData) => (dispatch) => {
    return uploadService.importEtudiantExcel(formData).then(
        (data) => {
            dispatch({
                type: type.SET_MESSAGE,
                payload: data.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

const importNoteExcelAction = (formData) => (dispatch) => {
    return uploadService.importNoteExcel(formData).then(
        (data) => {
            dispatch({
                type: type.SET_MESSAGE,
                payload: data.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message || error;
            dispatch({
                type: type.SET_MESSAGE,
                payload: message,
            });
            return Promise.reject(error);
        }
    );
}

export { importEtudiantExcelAction, importNoteExcelAction };