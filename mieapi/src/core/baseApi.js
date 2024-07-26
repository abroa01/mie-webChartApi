import base64 from 'base-64';
//import { BASE_URL, USERNAME, PASSWORD } from '../config/apiConfig.js';
import logger from '../logging/logger.js';

class BaseApi {
    constructor() {
        this.baseUrl = null;
        this.cookie = null;
        this.debug = false;
        this.sessionId = null;
    }

    async initializeSession(userHandle, username, password) {
        logger.info('Initializing session');
        try {
            console.log(userHandle);
            const url = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
            const loginData = {
                login_user: username,
                login_passwd: password
            };
            console.log(loginData);
            const data = new URLSearchParams(loginData).toString();
            console.log(data);
            this.baseUrl = url;
            logger.info('base url: ' +this.baseUrl)
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
                console.log(this.cookie);
                return this.cookie;
            }
        } catch (error) {
            logger.error('Session failed to initialize :', error);
            //console.error('Session failed to initialize:', error);
        }
    }


    async getRequest(sessionCookie, method, endpoint, options, callback) {
        console.log(sessionCookie);
        if (!sessionCookie) {
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
                    //'Authorization': `Bearer ${sessionCookie}`
                    'cookie': `wc_miehr_anshulmie_session_id=${sessionCookie}`
                },
                
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);            }
            profiler.done({message: `Request to ${url} processed`})
            const responseData = await response.json();
            
            callback(null, responseData);
        } catch (error) {
            logger.error(`GET request failed: ${error.message}`);
            callback(error);
        }
    }

    async putRequest(sessionCookie, method ,json, endpoint, callback) {
        if(!sessionCookie){
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
                    
                },
                Authorization: `Bearer ${sessionCookie}`,
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

