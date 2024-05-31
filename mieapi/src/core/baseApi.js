import axios from 'axios';

class BaseApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.debug = false;
    }

    enableDebug(logFunction) {
        this.debug = true;
        this.log = logFunction;
    }

    request(method, endpoint, options, callback) {
        let url = `${this.baseUrl}/${endpoint}`;
        console.log('Constructed URL : ', url)
        if (typeof options === 'string') {
            url += `?${options}`;
        } else if (typeof options === 'object') {
            const queryParams = new URLSearchParams(options).toString();
            url += `?${queryParams}`;
        }
        if (this.debug) {
            this.log(`URL: ${url}`);
        }

        axios({
            method,
            url
        }).then(response => {
            callback(response.data);
        }).catch(error => {
            callback(null, error);
        });
    }
}

export default BaseApi;
