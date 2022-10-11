const BASE_URL_API = "http://localhost:7000/api";
const AUTH_BASE_URL = BASE_URL_API + "/auth";
const BACKOPS_BASE_URL = BASE_URL_API + "/backops";
const UPLOAD_BASE_URL = BASE_URL_API + "/upload";

const API_AUTH_URLS = {
    LOGIN: AUTH_BASE_URL + "/login",
    REGISTER_ADMIN: AUTH_BASE_URL + "/register-admin",
    REGISTER_STUDENT: AUTH_BASE_URL + "/register-student",
    LOGOUT: AUTH_BASE_URL + "/logout",
};

const API_FILIERE_URLS = {
    GET_ALL_FILIERES: BACKOPS_BASE_URL + "/get-all-filieres",
}

const API_UPLOAD_URLS = {
    IMPORT_ETUDIANT_EXCEL: UPLOAD_BASE_URL + "/etudiant-excel",
}

module.exports = {
    API_AUTH_URLS,
    API_FILIERE_URLS,
    API_UPLOAD_URLS
};