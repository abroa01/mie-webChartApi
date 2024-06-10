import { BASE_URL } from './config/apiConfig.js';
import api from './apis/index.js';

const { ApiService } = api;

const apiService = new ApiService(BASE_URL);

export default {
    apiService
};
