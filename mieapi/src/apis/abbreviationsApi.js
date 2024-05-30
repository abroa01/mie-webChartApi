const BaseApi = require('../core/baseApi');

class AbbreviationsApi extends BaseApi{
    constructor(baseUrl) {
        super(baseUrl);
    }

    getAbbreviations(options, callback){
        this.request('GET', 'db/abbrevations', options, callback);
    }
}

module.exports = AbbreviationsApi;