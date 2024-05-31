import BASE_URL from './config/apiConfig.js';
import api from './apis/index.js';
const { AbbreviationsApi } = api;

const abbreviationsApi = new AbbreviationsApi(BASE_URL);

export default {
    abbreviationsApi
};
