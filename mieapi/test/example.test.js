// Import necessary modules
import AbbreviationsApi from '../src/apis/abbreviationsApi.js';
import { BASE_URL, USERNAME, PASSWORD } from '../src/config/apiConfig.js';

// Create a new instance of the AbbreviationsApi with the base URL
const abbreviationsApi = new AbbreviationsApi(BASE_URL);

// Define a function to initialize the session
const initializeSession = async () => {
    try {
        // Call the initializeSession method of the AbbreviationsApi
        await abbreviationsApi.initializeSession();
        console.log('Session initialized with cookie:', abbreviationsApi.cookie);
    } catch (error) {
        console.error('Session failed to initialize:', error);
    }
};

// Define a function to get abbreviations
const getAbbreviations = async () => {
    try {
        // Call the getAbbreviations method of the AbbreviationsApi
        await abbreviationsApi.getAbbreviations('LIKE_term_id=somethi&limit=10', (response, error) => {
            if (error) {
                console.error('Error fetching abbreviations:', error);
            } else {
                console.log('GET abbreviationsApi Response:', response);
            }
        });
    } catch (error) {
        console.error('Error getting abbreviations:', error);
    }
};

// Call the initializeSession function to start the session
initializeSession();

// Call the getAbbreviations function to fetch the abbreviations
getAbbreviations();
