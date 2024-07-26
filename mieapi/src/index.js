import apiNames from './config/apiConfig.js';
import api from './apis/index.js';
import logger from './logging/logger.js'

const { ApiService } = api;

const apiService = new ApiService();

export default {
    apiService
};
