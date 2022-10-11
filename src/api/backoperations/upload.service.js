import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import {API_UPLOAD_URLS} from 'utils/global-constants';


const importEtudiantExcel = (formData) => {
    return axios.post(API_UPLOAD_URLS.IMPORT_ETUDIANT_EXCEL, formData, { headers: authHeader() });
}

const importNoteExcel = (formData) => {
    return axios.post(API_UPLOAD_URLS.IMPORT_NOTE_EXCEL, formData, { headers: authHeader() });
}

export  {
    importEtudiantExcel,
    importNoteExcel
}