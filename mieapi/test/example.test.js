import api from '../src/index.js';
const { abbreviationsApi } = api;

// Debugging
abbreviationsApi.enableDebug(console.log);

// GET request to return all rows from Abbreviations table
abbreviationsApi.getAbbreviations('', function(res, err) {
    if (err) {
        console.log('GET abbreviationsApi Error:', err);
    } else {
        console.log('GET abbreviationsApi Response:', res);
    }
});
