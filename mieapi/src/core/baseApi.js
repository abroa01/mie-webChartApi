import axios from 'axios';
import { BASE_URL, USERNAME, PASSWORD } from '../config/apiConfig.js';
import base64 from 'base-64';  

class BaseApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
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
            const response = await axios.post(this.baseUrl, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const setCookieHeader = response.headers['set-cookie'];
            if (setCookieHeader) {
                this.cookie = setCookieHeader[0].split(';')[0].split('=')[1];
                if (this.debug) {
                    console.log('Session initialized with cookie:', this.cookie);
                }
            }
        } catch (error) {
            console.error('Session failed to initialize:', error);
        }
    }

    async request(method, endpoint, options, callback) {
        if (!this.cookie) {
            console.error('No session cookie available');
            callback(null, new Error('No session cookie available'));
            return;
        }

        const encodedEndpoint = base64.encode(endpoint);
        const url = `${this.baseUrl}?f=json&session_id=${this.cookie}&apistring=${encodedEndpoint}`;
    
        if (this.debug) {
            console.log(`URL: ${url}`);
        }

        try {
            const response = await axios({
                method,
                url
            });
            callback(response.data);
        } catch (error) {
            callback(null, error);
        }
    }
}

export default BaseApi;
