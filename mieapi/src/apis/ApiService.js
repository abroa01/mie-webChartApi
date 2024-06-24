import BaseApi from '../core/baseApi.js';
import { endpoints } from '../config/apiConfig.js';
import logger from '../logging/logger.js';


export class ApiService extends BaseApi {
    constructor() {
        super();
    }

    async getApi(apiName, options, callback) {
        try {
            logger.info(`getApi called with apiName: ${apiName}`);
            if (!this.cookie) {
                await this.initializeSession();
            }
            const endpoint = this.getEndpoints(apiName);
            if(!endpoint) {
                throw new Error (`API endpoint for ${apiName} not found.`);
            }
            //const endpoint = `${}`
            this.getRequest('GET', endpoint, options, callback);
        } catch (error) {
            logger.error('Error fetching Api:', error);
            //console.error('Error fetching Api:', error);
            if (callback && typeof callback === 'function') {
                callback(error);
            }
        }
    }

    async putApi(apiName, json, callback) {
        try{
            logger.info(`putApi called with apiName: ${apiName}`);
            if(!this.cookie) {
                await this.initializeSession();
            }
            const endpoint = this.getEndpoints(apiName);
            if(!endpoint) {
                throw new Error (`API endpoint for ${apiName} not found.`);
            }
            //const endpoint = 'PUT/db/abbreviations';
            this.putRequest('PUT', json, endpoint, callback)
        } catch (error) {
            logger.error('Error fetching Api:', error);
            //console.error('Error fetching Api:', error);
            if (callback && typeof callback === 'function') {
                callback(error);
            }
        }
    }
    getEndpoints(apiName){
        logger.info(`getEndpoints called with apiName: ${apiName}`);
        const lowerCaseEndpoint = apiName.toLowerCase();
        //console.log(lowerCaseEndpoint);
        for(const key in endpoints) {
            if(key.toLowerCase() == lowerCaseEndpoint) {
                console.log(endpoints[key]);
                logger.info(`endpoint fetched for ${apiName} : ${endpoints[key]}`)
                return endpoints[key];
            }
        }
        return null;

    }
    
}
