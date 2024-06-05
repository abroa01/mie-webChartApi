import base64 from 'base-64';
import { BASE_URL, USERNAME, PASSWORD } from '../config/apiConfig.js';

class BaseApi {
    constructor() {
        this.baseUrl = BASE_URL;
        this.cookie = null;
        this.debug = false;
    }

    async initializeSession() {
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
                if (this.debug) {
                    console.log('Session initialized with cookie:', this.cookie);
                }
            }
        } catch (error) {
            console.error('Session failed to initialize:', error);
        }
    }

    enableDebug(logFunction) {
        this.debug = true;
        this.log = logFunction;
    }

    async getRequest(method, endpoint, options, callback) {
        if (!this.cookie) {
            console.error('No session cookie available');
            callback(new Error('No session cookie available'));
            return;
        }

        const encodedEndpoint = base64.encode(endpoint);
        const url = `${this.baseUrl}/${encodedEndpoint}`;

        if (this.debug) {
            this.log(`URL: ${url}`);
        }

        try {
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

            const responseData = await response.json();
            callback(null, responseData);
        } catch (error) {
            callback(error);
        }
    }

    async putRequest(method ,json, endpoint, callback) {
        if(!this.cookie){
            console.error('No Session Cookie Available');
            callback(new Error('No Session Cookie Available'));
            return;
        }
        const encodedEndpoint = base64.encode(endpoint);
        const url = `${this.baseUrl}/${encodedEndpoint}`;
        const jsonBody = Array.isArray(json) ? json : [json];
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type':'application/json',
                    'cookie': `wc_miehr_anshulmie_session_id=${this.cookie}`  
                },
                body: JSON.stringify(jsonBody)
            }).then((data) => data.json());
            if (this.debug) {
                this.log(`URL: ${url}`);
            }
            if (!response.status == 200) {
                const responseData = await response.json();
                callback(null, responseData);
                throw new Error(`HTTP error! status: ${response.status} | ${response.msg} | ${response.errors}`);
            }
        }catch(error){
            callback(error);
        }


    }


}

export default BaseApi;

