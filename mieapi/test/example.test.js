import api from '../src/index.js';
const { abbreviationsApi } = api;

// Enable debugging
abbreviationsApi.enableDebug(console.log);

(async () => {
    // Wait for the session to be initialized before making the request
    await abbreviationsApi.initializeSession();

    // GET Request to return all rows from Abbreviations table
    abbreviationsApi.getAbbreviations('', function(err, res) {
        if (err) {
            console.log('GET abbreviationsApi Error:', err);
        } else {
            console.log('GET abbreviationsApi Response:', res);
        }
    });
})();
