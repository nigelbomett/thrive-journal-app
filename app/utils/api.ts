import axios from "axios";
import {API_BASE_URL_LOCAL,API_URL_PROD} from '@env';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: API_URL_PROD
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;