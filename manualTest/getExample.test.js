import api from '../mieapi/src/index.js';
const { apiService } = api;

// Enable debugging
//apiService.enableDebug(console.log);

(async () => {
    // Wait for the session to be initialized before making the request
    await apiService.initializeSession();

    // GET Request to return all rows from Abbreviations table
    apiService.getApi('abbreviations','', function(err, res) {
        if (err) {
            console.log('GET Api Error:', err);
        } else {
            console.log('GET Api Response:', res);
        }
    });
})(); 


