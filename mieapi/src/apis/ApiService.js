// import BaseApi from '../core/baseApi.js';
// import { endpoints } from '../config/apiConfig.js';
// import logger from '../logging/logger.js';


// export class ApiService extends BaseApi {
//     constructor() {
//         super();
//     }
//     async getApi(sessionCookie, apiName, options, userHandle, appendUrl) {
//         logger.info(`getApi called with apiName: ${apiName}`);
      
//         if (!sessionCookie) {
//           logger.error('No Session Cookie Available');
//           throw new Error('No session cookie available');
//         }
      
//         const endpoint = this.getEndpoints(apiName);
//         if (!endpoint) {
//           throw new Error(`API endpoint for ${apiName} not found.`);
//         }
      
//         appendUrl = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
      
//         try {
//           return await this.getRequest(sessionCookie, 'GET', endpoint, options, userHandle, appendUrl);
//         } catch (error) {
//           logger.error('Error fetching Api:', error);
//           throw error;
//         }
//       }

//     async putApi(sessionCookie, apiName, json, userHandle) {
//         try {
//           logger.info(`putApi called with apiName: ${apiName}`);
      
//           if (!sessionCookie) {
//             await this.initializeSession();
//             // You might want to get the new sessionCookie here if initializeSession() provides one
//           }
      
//           const endpoint = this.getEndpoints(apiName);
//           if (!endpoint) {
//             throw new Error(`API endpoint for ${apiName} not found.`);
//           }
      
//           return await this.putRequest(sessionCookie, 'PUT', json, endpoint, userHandle);
//         } catch (error) {
//           logger.error('Error in putApi:', error);
//           throw error; 
//         }
//       }
//     getEndpoints(apiName){
//         logger.info(`getEndpoints called with apiName: ${apiName}`);
//         const lowerCaseEndpoint = apiName.toLowerCase();
        
//         for(const key in endpoints) {
//             if(key.toLowerCase() == lowerCaseEndpoint) {
                
//                 logger.info(`endpoint fetched for ${apiName} : ${endpoints[key]}`)
//                 return endpoints[key];
//             }
//         }
//         return null;

//     }
    
// }

import BaseApi from '../core/baseApi';
import { endpoints } from '../config/apiConfig';
import logger from '../logging/logger';

export class ApiService extends BaseApi {
    async getApi(sessionCookie, apiName, options, userHandle, appendUrl) {
        logger.info(`getApi called with apiName: ${apiName}`);
        
        if (!sessionCookie) {
            throw new Error('No session cookie available');
        }
        
        const endpoint = this.getEndpoint(apiName);
        const url = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
        
        try {
            return await this.getRequest(sessionCookie, 'GET', endpoint, options, userHandle, url);
        } catch (error) {
            logger.error('Error fetching API:', error);
            throw error;
        }
    }

    async putApi(sessionCookie, apiName, json, userHandle) {
        logger.info(`putApi called with apiName: ${apiName}`);
        
        if (!sessionCookie) {
            throw new Error('No session cookie available');
        }
        
        const endpoint = this.getEndpoint(apiName);
        const url = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
        
        try {
            return await this.putRequest(sessionCookie, 'PUT', json, endpoint, userHandle, url);
        } catch (error) {
            logger.error('Error in putApi:', error);
            throw error; 
        }
    }

    getEndpoint(apiName) {
        const lowerCaseEndpoint = apiName.toLowerCase();
        const endpoint = Object.entries(endpoints).find(([key]) => key.toLowerCase() === lowerCaseEndpoint);
        
        if (!endpoint) {
            throw new Error(`API endpoint for ${apiName} not found.`);
        }
        
        logger.info(`Endpoint fetched for ${apiName}: ${endpoint[1]}`);
        return endpoint[1];
    }
}