const BASE_URL_API = "http://localhost:7000/api";
const AUTH_BASE_URL = BASE_URL_API + "/auth";

const API_AUTH_URLS = {
    LOGIN: AUTH_BASE_URL + "/login",
    REGISTER: AUTH_BASE_URL + "/register",
    LOGOUT: AUTH_BASE_URL + "/logout",
};


module.exports = {
    API_AUTH_URLS,
};