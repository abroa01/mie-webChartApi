import api from '../mieapi/src/index.js';
const { apiService } = api;

// Enable debugging
//apiService.enableDebug(console.log);
(async () => {
    await apiService.initializeSession();
    const jsonBody = {
        abbrev: 'po',
        abbrev_plural: 'po',
        term: 'by mouth',
        term_id: '44',
        term_plural: 'by mouth'
      }

    apiService.putApi('abbreviations', jsonBody, function(err, res){
        if(err) {
            console.error('PUT Abbreviation error:', err);
        } else {
            console.log('PUT Abbreviation api Response:', res);
        }
    }); 
})()