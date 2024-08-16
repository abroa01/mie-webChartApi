// import base64 from 'base-64';
// import logger from '../logging/logger.js';

// class BaseApi {
//     constructor() {
//         this.baseUrl = null;
//         this.cookie = null;
//         this.debug = false;
//         this.sessionId = null;
//     }
//     async initializeSession(userHandle, username, password) {
//         logger.info(`Initializing session for user : ${userHandle} with username : ${username}`);
//         try {
//           const url = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
//           logger.info(`URL created is : ${url} `);
//           const loginData = {
//             login_user: username,
//             login_passwd: password
//           };
//           const data = new URLSearchParams(loginData).toString();
//           this.baseUrl = url;
//           logger.info(`Making fetch request to : ${url} `);
//           const response = await fetch(this.baseUrl, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: data
//           });
//           logger.info(`Response Status  : ${response.status} `);
//           logger.info(`Status Text : ${response.statusText} `);
          
//           if (response.status === 401) {
//             return { success: false, message: 'Unauthorized' };
//           } else {
//             const setCookieHeader = response.headers.get('set-cookie');
            
//             if (setCookieHeader) {
//               this.cookie = setCookieHeader.split(';')[0].split('=')[1];
//               //logger.info(`Session initialized successfully with cookie : ${this.cookie}`);
//               return { success: true, cookie: this.cookie };
//             } else {
//               return { success: false, message: 'No set-cookie header found' };
//             }
//           }
//         } catch (error) {
//           logger.error('Session failed to initialize :', error);
//           return { success: false, message: error.message };
//         }
//       }
//     async getRequest(sessionCookie, method, endpoint, options, userHandle, appendedUrl) {
//       if (!sessionCookie) {
//         logger.error('No Session Cookie Available');
//         throw new Error('No session cookie available');
//       }
    
//       const encodedEndpoint = base64.encode(`${method}/${endpoint}/${JSON.stringify(options)}`);
//       if (!this.baseUrl) {
//         this.baseUrl = appendedUrl;
//       }
    
//       const url = `${this.baseUrl}/${encodedEndpoint}`;
//       logger.info(`Making GET request to: ${url}`);
    
//       const profiler = logger.startTimer();
    
//       try {
//         const response = await fetch(url, {
//           method,
//           headers: {
//             'Content-Type': 'application/json',
//             'cookie': `wc_miehr_${userHandle}_session_id=${sessionCookie}`
//           },
//         });
    
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
    
//         profiler.done({message: `Request to ${url} processed`});
//         return await response.json();
//       } catch (error) {
//         logger.error(`GET request failed: ${error.message}`);
//         throw error;
//       }
//     }

//   async putRequest(sessionCookie, method, json, endpoint, userHandle) {
//   if (!sessionCookie) {
//     logger.error('No Session Cookie Available');
//     throw new Error('No Session Cookie Available');
//   }

//   const encodedEndpoint = base64.encode(`${method}/${endpoint}`);
//   const url = `${this.baseUrl}/${encodedEndpoint}`;
//   const jsonBody = Array.isArray(json) ? json : [json];

//   logger.info(`Making PUT request to: ${url} with Json Body : ${JSON.stringify(jsonBody)}`);

//   try {
//     const profiler = logger.startTimer();

//     const response = await fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         'cookie': `wc_miehr_${userHandle}_session_id=${sessionCookie}`
//       },
//       body: JSON.stringify(jsonBody)
//     });

//     profiler.done({message: `Request to ${url} processed`});

//     const responseData = await response.json();

//     if (response.status !== 200) {
//       throw new Error(`HTTP error! status: ${response.status} | ${responseData.msg || ''} | ${JSON.stringify(responseData.errors || {})}`);
//     }

//     return responseData;
//   } catch (error) {
//     logger.error(`PUT request failed: ${error.message}`);
//     throw error;
//   }
// }

// }

// export default BaseApi;


import base64 from 'base-64';
import logger from '../logging/logger';

class BaseApi {
    constructor() {
        this.baseUrl = null;
    }

    async initializeSession(userHandle, username, password) {
        logger.info(`Initializing session for user: ${userHandle}`);
        const url = `https://${userHandle}.webchartnow.com/webchart.cgi/json`;
        const loginData = new URLSearchParams({ login_user: username, login_passwd: password });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: loginData.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const setCookieHeader = response.headers.get('set-cookie');
            if (!setCookieHeader) {
                throw new Error('No set-cookie header found');
            }

            const cookie = setCookieHeader.split(';')[0].split('=')[1];
            return { success: true, cookie };
        } catch (error) {
            logger.error('Session failed to initialize:', error);
            return { success: false, message: error.message };
        }
    }

    async getRequest(sessionCookie, method, endpoint, options, userHandle, appendedUrl) {
        const encodedEndpoint = base64.encode(`${method}/${endpoint}/${JSON.stringify(options)}`);
        const url = `${appendedUrl}/${encodedEndpoint}`;
        
        logger.info(`Making GET request to: ${url}`);
        const profiler = logger.startTimer();

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': `wc_miehr_${userHandle}_session_id=${sessionCookie}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            profiler.done({ message: `Request to ${url} processed` });
            return await response.json();
        } catch (error) {
            logger.error(`GET request failed: ${error.message}`);
            throw error;
        }
    }

    async putRequest(sessionCookie, method, json, endpoint, userHandle) {
        const encodedEndpoint = base64.encode(`${method}/${endpoint}`);
        const url = `${this.baseUrl}/${encodedEndpoint}`;
        const jsonBody = Array.isArray(json) ? json : [json];

        logger.info(`Making PUT request to: ${url}`);
        const profiler = logger.startTimer();

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': `wc_miehr_${userHandle}_session_id=${sessionCookie}`
                },
                body: JSON.stringify(jsonBody)
            });

            profiler.done({ message: `Request to ${url} processed` });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} | ${responseData.msg || ''} | ${JSON.stringify(responseData.errors || {})}`);
            }

            return responseData;
        } catch (error) {
            logger.error(`PUT request failed: ${error.message}`);
            throw error;
        }
    }
}

export default BaseApi;