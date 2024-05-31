import BaseApi from '../core/baseApi.js';

class AbbreviationsApi extends BaseApi {
    constructor(baseUrl) {
        super(baseUrl);
    }

    async getAbbreviations(options, callback) {
        if (!this.cookie) {
            await this.initializeSession();
        }
        await this.request('GET', 'db/abbreviations', options, callback);
    }
}

export default AbbreviationsApi;
