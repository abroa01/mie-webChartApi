import base64 from 'base-64';
import { BASE_URL, USERNAME, PASSWORD } from '../config/apiConfig.js';
import logger from '../logging/logger.js';

class BaseApi {
    constructor() {
        this.baseUrl = BASE_URL;
        this.cookie = null;
        this.debug = false;
    }

    async initializeSession() {
        logger.info('Initializing session');
        try {
            const loginData = {
                login_user: USERNAME,
                login_passwd: PASSWORD
            };
            const data = new URLSearchParams(loginData).toString();
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            });
            const setCookieHeader = response.headers.get('set-cookie');
            if (setCookieHeader) {
                this.cookie = setCookieHeader.split(';')[0].split('=')[1];
                logger.info(`Session initialized successfully with cookie : ${this.cookie}`);
            }
        } catch (error) {
            logger.error('Session failed to initialize :', error);
            //console.error('Session failed to initialize:', error);
        }
    }


    async getRequest(method, endpoint, options, callback) {
        if (!this.cookie) {
            //console.error('No session cookie available');
            logger.error('No Session Cookie Available');
            callback(new Error('No session cookie available'));
            return;
        }
        //const revisedEndpoint = `${method}/${endpoint}`
        const encodedEndpoint = base64.encode(`${method}/${endpoint}/${options}`);
        //console.log(encodedEndpoint);
        const url = `${this.baseUrl}/${encodedEndpoint}`;
        logger.info(`Making GET request to: ${url}`);

        try {
            const profiler = logger.startTimer();
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type':'application/json',
                    'cookie': `wc_miehr_anshulmie_session_id=${this.cookie}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            profiler.done({message: `Request to ${url} processed`})
            const responseData = await response.json();
            
            callback(null, responseData);
        } catch (error) {
            logger.error(`GET request failed: ${error.message}`);
            callback(error);
        }
    }

    async putRequest(method ,json, endpoint, callback) {
        if(!this.cookie){
            logger.error('No Session Cookie Available');
            //console.error('No Session Cookie Available');
            callback(new Error('No Session Cookie Available'));
            return;
        }
        //const revisedEndpoint = `${method}/${endpoint}`
        const encodedEndpoint = base64.encode(`${method}/${endpoint}`);
        const url = `${this.baseUrl}/${encodedEndpoint}`;
        const jsonBody = Array.isArray(json) ? json : [json];
        logger.info(`Making PUT request to: ${url} with Json Body : ${JSON.stringify(jsonBody)}`);
        try {
            const profiler = logger.startTimer();
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type':'application/json',
                    'cookie': `wc_miehr_anshulmie_session_id=${this.cookie}`  
                },
                body: JSON.stringify(jsonBody)
            });//.then((data) => data.json());
            profiler.done({message: `Request to ${url} processed`})
            const responseData = await response.json();
            
            if (response.status !== 200) {
                
                throw new Error(`HTTP error! status: ${response.status} | ${response.msg} | ${response.errors}`);
            }
            callback(null, responseData);
        }catch(error){
            logger.error(`PUT request failed: ${error.message}`);
            callback(error);
        }


    }


}

export default BaseApi;

