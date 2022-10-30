const BASE_URL_API = "http://localhost:7000/api";

const AUTH_BASE_URL = BASE_URL_API + "/auth";
const BACKOPS_BASE_URL = BASE_URL_API + "/backops";
const UPLOAD_BASE_URL = BASE_URL_API + "/upload";
const PROCESS_BASE_URL = BASE_URL_API + "/process";
const PROFILE_BASE_URL = BASE_URL_API + "/profile";
const ALGO_BASE_URL = BASE_URL_API + "/algo";

const API_AUTH_URLS = {
    LOGIN: AUTH_BASE_URL + "/login",
    REGISTER_ADMIN: AUTH_BASE_URL + "/register-admin",
    REGISTER_STUDENT: AUTH_BASE_URL + "/register-student",
    LOGOUT: AUTH_BASE_URL + "/logout",
};

const API_FILIERE_URLS = {
    GET_ALL_FILIERES: BACKOPS_BASE_URL + "/get-all-filieres",
    GET_CERTIFIED_FILIERES: BACKOPS_BASE_URL + "/get-certified-filieres",
}

const API_PROFILE = {
    GET_PROFILE_STUDENT: PROFILE_BASE_URL + "/student-profile",
    GET_PRIVATE_PROFILE: PROFILE_BASE_URL + "/student-private-profile",
    UPDATE_VISIBILITY: PROFILE_BASE_URL + "/update-profile-visibility",
    UPLOAD_AVATAR: PROFILE_BASE_URL + "/upload-avatar",
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
    GET_ALL_CERTIFICATS_BY_FILIERE: BACKOPS_BASE_URL + "/get-all-certificats-by-filiere",
}

const API_ETABLISSEMENTS_URLS = {
    CREATE_ETABLISSEMENT: BACKOPS_BASE_URL + "/create-etablissement",
    CREATE_FILIERE: BACKOPS_BASE_URL + "/create-filiere",
    UPLOAD_LOGO: BACKOPS_BASE_URL + "/upload-profile-image",
    GET_ETABS : BACKOPS_BASE_URL + "/get-etablissements"
}


const API_ALGO_URLS = {
    GET_ALGO_CLIENT: ALGO_BASE_URL + "/get-algod-client",
    SEND_RAW_TRANSACTION: ALGO_BASE_URL + "/send-raw-transaction",
}

const VERIFICATION_URLS = {
    GET_GENERAL_INFO: PROCESS_BASE_URL + "/get-student-info",
    BRING_CERTIFICATE: PROCESS_BASE_URL + "/get-certificate",
}

const WALLET_CONSTANTS = {
    // WALLET_BASE_URL: "http://localhost:3000",
    // WALLET_AUTH_TOKEN: "WALLET_AUTH_TOKEN",
    // WALLET_ACCOUNT_ADDRESS: "WALLET_ACCOUNT_ADDRESS",
    // WALLET_ACCOUNT_WALLET: "WALLET_ACCOUNT_WALLET",
    // WALLET_ACCOUNT_IOS: "WALLET_ACCOUNT_IOS",
    ALGO_SIGNER: "ALGO_SIGNER",
    WALLET_CONNECT: "WALLET_CONNECT",
    TESTNET: "TestNet",
}

module.exports = {
    API_AUTH_URLS,
    API_FILIERE_URLS,
    API_ETUDIANTS_URLS,
    API_UPLOAD_URLS,
    API_CERTIFICATE_URLS,
    WALLET_CONSTANTS,
    API_PROFILE,
    API_ETABLISSEMENTS_URLS,
    API_ALGO_URLS,
    VERIFICATION_URLS
};