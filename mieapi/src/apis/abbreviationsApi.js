import BaseApi from '../core/baseApi.js';
import BASE_URL  from '../config/apiConfig.js';

const  abbreviationsApi = new BaseApi(BASE_URL);
class AbbreviationsApi extends BaseApi {
    constructor(baseUrl) {
        super(baseUrl);
    }

    getAbbreviations(options, callback) {
        this.request('GET', 'db/abbreviations', options, callback);
    }
}

export default AbbreviationsApi;
