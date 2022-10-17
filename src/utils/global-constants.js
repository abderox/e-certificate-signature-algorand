const BASE_URL_API = "http://localhost:7000/api";

const AUTH_BASE_URL = BASE_URL_API + "/auth";
const BACKOPS_BASE_URL = BASE_URL_API + "/backops";
const UPLOAD_BASE_URL = BASE_URL_API + "/upload";
const PROCESS_BASE_URL = BASE_URL_API + "/process";
const PROFILE_BASE_URL = BASE_URL_API + "/profile";

const API_AUTH_URLS = {
    LOGIN: AUTH_BASE_URL + "/login",
    REGISTER_ADMIN: AUTH_BASE_URL + "/register-admin",
    REGISTER_STUDENT: AUTH_BASE_URL + "/register-student",
    LOGOUT: AUTH_BASE_URL + "/logout",
};

const API_FILIERE_URLS = {
    GET_ALL_FILIERES: BACKOPS_BASE_URL + "/get-all-filieres",
}

const API_PROFILE = {
    GET_PROFILE_STUDENT: PROFILE_BASE_URL + "/student-profile",
    UPDATE_VISIBILITY: PROFILE_BASE_URL + "/update-profile-visibility",
}

const API_ETUDIANTS_URLS = {
    GET_ALL_ETUDIANTS: BACKOPS_BASE_URL + "/get-all-etudiants",
}

const API_UPLOAD_URLS = {
    IMPORT_ETUDIANT_EXCEL: UPLOAD_BASE_URL + "/etudiant-excel",
    IMPORT_NOTE_EXCEL: UPLOAD_BASE_URL + "/note-excel",
}

const API_CERTIFICATE_URLS = {
    GENERATE_CERTIFICATE: PROCESS_BASE_URL + "/generate-certificate",
    GENERATE_CERTIFICATES: PROCESS_BASE_URL + "/generate-certificates",
}

module.exports = {
    API_AUTH_URLS,
    API_FILIERE_URLS,
    API_ETUDIANTS_URLS,
    API_UPLOAD_URLS,
    API_CERTIFICATE_URLS,
    API_PROFILE,
};