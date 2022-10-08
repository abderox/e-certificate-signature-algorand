import axios from 'axios';
import {API_UPLOAD_URLS} from 'utils/global-constants';


const importEtudiantExcel = (formData) => {
    return axios.post(API_UPLOAD_URLS.IMPORT_ETUDIANT_EXCEL, formData);
}

export  {
    importEtudiantExcel
}