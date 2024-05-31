import { initializeSession } from './core/baseApi.js';
import { fetchData } from './apis/abbreviationsApi.js';

async function main() {
    const USERNAME = 'abroa01';
    const PASSWORD = '$K@ter0707';
    let COOKIE = null;

    console.log('Initializing session');
    try {
        COOKIE = await initializeSession(USERNAME, PASSWORD);
    } catch (error) {
        console.error(error.message);
        return;
    }

    if (!COOKIE) {
        console.error('Cookie not found. Session initialization failed.');
        return;
    }

    console.log('Session initialized successfully.');

    try {
        const data = await fetchData(COOKIE);
        console.log(JSON.stringify(data));
    } catch (error) {
        console.error(error.message);
    }
}

main();
