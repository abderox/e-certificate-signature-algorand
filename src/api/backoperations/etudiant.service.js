import authHeader from 'api/auth/authHeaders.service';
import axios from 'axios';
import {API_ETUDIANTS_URLS} from 'utils/global-constants';


const getAllEtudiants = (options = {}) => {
    console.log("getAllEtudiants: ", options.valide);

    const filiere = options.filiere ? options.filiere : "";
    const search = options.search ? options.search : "";
    const page = options.page ? options.page : 1;
    const size = options.size ? options.size : 15;
    // const valide = (options.valide != null && options.valide != undefined && options.valide != "") ? (options.valide == true ? 1 : 0) : null;
    const valide = (options.valide == null ) ? null : (options.valide == true ? 1 : 0);
    const certified = (options.certified == null ) ? null : (options.certified == true ? 1 : 0);
    // const certified = (options.certified != null && options.certified != undefined && options.certified != "" ) ? (options.certified ? 1 : 0) : null;
    
    console.log("getAllEtudiants: ", valide);
    console.log(options)
    return axios.get(API_ETUDIANTS_URLS.GET_ALL_ETUDIANTS, { headers: authHeader(), params: { filiere, search, page, size, valide, certified } });
}

export  {
    getAllEtudiants
}