import base64 from 'base-64';
import logger from '../logging/logger.js';

class BaseApi {
    constructor() {
        this.baseUrl = null;
        this.cookie = null;
        this.debug = false;
        this.sessionId = null;
    }
    async initializeSession(userHandle, username, password) {
        logger.info(`Initializing session for user : ${userHandle} with username : ${username} and password : ${password}`);
        try {
          const url = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
          logger.info(`URL created is : ${url} `);
          const loginData = {
            login_user: username,
            login_passwd: password
          };
          const data = new URLSearchParams(loginData).toString();
          this.baseUrl = url;
          logger.info(`Making fetch request to : ${url} `);
          const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
          });
          logger.info(`Response Status  : ${response.status} `);
          logger.info(`Status Text : ${response.statusText} `);
          
          if (response.status === 401) {
            return { success: false, message: 'Unauthorized' };
          } else {
            const setCookieHeader = response.headers.get('set-cookie');
            //console.log(setCookieHeader);
            if (setCookieHeader) {
              this.cookie = setCookieHeader.split(';')[0].split('=')[1];
              logger.info(`Session initialized successfully with cookie : ${this.cookie}`);
              return { success: true, cookie: this.cookie };
            } else {
              return { success: false, message: 'No set-cookie header found' };
            }
          }
        } catch (error) {
          logger.error('Session failed to initialize :', error);
          return { success: false, message: error.message };
        }
      }


    async getRequest(sessionCookie, method, endpoint, options,userHandle, callback) {
        console.log(`Session cookie from GetRequest method - ${sessionCookie}`);
        console.log(`method from GetRequest method - ${method}`);
        console.log(`endpoint from GetRequest method - ${endpoint}`);
        console.log(`options from GetRequest method - ${options}`);
        console.log(`userHandle from GetRequest method - ${userHandle}`);
        console.log(callback);

        if (!sessionCookie) {
            
            logger.error('No Session Cookie Available');
            callback(new Error('No session cookie available'));
            return;
        }
    
        const encodedEndpoint = base64.encode(`${method}/${endpoint}/${options}`);
    
        console.log(this.baseUrl);
        const url = `${this.baseUrl}/${encodedEndpoint}`;

        
        logger.info(`Making GET request to: ${url}`);

        try {
            const profiler = logger.startTimer();
            console.log(`npm logs: userHandle: ${userHandle}`);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type':'application/json',
                    //'Authorization': `Bearer ${sessionCookie}`
                    'cookie': `wc_miehr_${userHandle}_session_id=${sessionCookie}`
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

    async putRequest(sessionCookie, method ,json, endpoint, userHandle, callback) {
        if(!sessionCookie){
            logger.error('No Session Cookie Available');
            
            callback(new Error('No Session Cookie Available'));
            return;
        }
        
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
                    'cookie': `wc_miehr_${userHandle}_session_id=${sessionCookie}`
                    
                },
                //Authorization: `Bearer ${sessionCookie}`,
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

