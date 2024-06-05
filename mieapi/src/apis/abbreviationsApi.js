import BaseApi from '../core/baseApi.js';


export class AbbreviationsApi extends BaseApi {
    constructor() {
        super();
    }

    async getAbbreviations(options, callback) {
        try {
            if (!this.cookie) {
                await this.initializeSession();
            }

            const endpoint = 'GET/db/abbreviations';
            this.getRequest('GET', endpoint, options, callback);
        } catch (error) {
            console.error('Error fetching abbreviations:', error);
            if (callback && typeof callback === 'function') {
                callback(error);
            }
        }
    }

    async putAbbreviations(json, callback) {
        try{
            if(!this.cookie) {
                await this.initializeSession();
            }
            const endpoint = 'PUT/db/abbreviations';
            this.putRequest('PUT', json, endpoint, callback)
        } catch (error) {
            console.error('Error fetching abbreviations:', error);
            if (callback && typeof callback === 'function') {
                callback(error);
            }
        }
    }
}
