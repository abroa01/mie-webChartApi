import { BASE_URL } from './config/apiConfig.js';
import api from './apis/index.js';
import logger from './logging/logger.js'

const { ApiService } = api;

const apiService = new ApiService(BASE_URL);

export default {
    apiService
};
