import BaseApi from '../core/baseApi.js';

class AbbreviationsApi extends BaseApi {
    constructor() {
        super();
    }

    async getAbbreviations(options, callback) {
        try {
            if (!this.cookie) {
                await this.initializeSession();
            }

            const endpoint = 'GET/db/abbreviations';
            this.request('GET', endpoint, options, callback);
        } catch (error) {
            console.error('Error fetching abbreviations:', error);
            if (callback && typeof callback === 'function') {
                callback(error);
            }
        }
    }
}

export default AbbreviationsApi;
