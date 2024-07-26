import BaseApi from '../core/baseApi.js';
import { endpoints } from '../config/apiConfig.js';
import logger from '../logging/logger.js';


export class ApiService extends BaseApi {
    constructor() {
        super();
    }

    async getApi(sessionCookie, apiName, options, callback) {
        try {
            logger.info(`getApi called with apiName: ${apiName}`);
            if (!sessionCookie) {
                logger.error('No Session Cookie Available');
                callback(new Error('No session cookie available'));
                return;
            }
            const endpoint = this.getEndpoints(apiName);
            if(!endpoint) {
                throw new Error (`API endpoint for ${apiName} not found.`);
            }
            //const endpoint = `${}`
            this.getRequest(sessionCookie,'GET', endpoint, options, callback);
        } catch (error) {
            logger.error('Error fetching Api:', error);
            //console.error('Error fetching Api:', error);
            if (callback && typeof callback === 'function') {
                callback(error);
            }
        }
    }

    async putApi(sessionCookie, apiName, json, callback) {
        try{
            logger.info(`putApi called with apiName: ${apiName}`);
            if(!sessionCookie) {
                await this.initializeSession();
            }
            const endpoint = this.getEndpoints(apiName);
            if(!endpoint) {
                throw new Error (`API endpoint for ${apiName} not found.`);
            }
            //const endpoint = 'PUT/db/abbreviations';
            this.putRequest(sessionCookie, 'PUT', json, endpoint, callback)
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
