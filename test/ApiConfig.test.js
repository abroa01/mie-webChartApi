import { expect } from 'chai';
import { BASE_URL, USERNAME, PASSWORD, endpoints } from '../mieapi/src/config/apiConfig.js';
import BaseApi from '../mieapi/src/core/baseApi.js';

const baseApi = new BaseApi();

describe('Endpoint Tests', () => {
    before(async () => {
        // Initialize session before running tests
        await baseApi.initializeSession();
        this.timeout(5000);
    });

    // Test case for BASE_URL
    it('should have a valid BASE_URL', () => {
        expect(BASE_URL).to.be.a('string');
        expect(BASE_URL).to.not.be.empty;
    });

    // Test case for USERNAME
    it('should have a valid USERNAME', () => {
        expect(USERNAME).to.be.a('string');
        expect(USERNAME).to.not.be.empty;
    });

    // Test case for PASSWORD
    it('should have a valid PASSWORD', () => {
        expect(PASSWORD).to.be.a('string');
        expect(PASSWORD).to.not.be.empty;
    });

    // Loop through each endpoint and create a test case
    Object.entries(endpoints).forEach(([endpointName, endpointPath]) => {
        it(`should successfully GET data from ${endpointName}`, async () => {
            // Make a GET request to the endpoint
            const callback = sinon.spy();
            await baseApi.getRequest('GET', endpointPath, {}, callback);

            // Expect the callback to be called without errors
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0]).to.be.null; // No error
            expect(callback.args[0][1]).to.be.an('object'); // Response data is an object
            // Add more specific checks for the response data if needed
        });
    });
});
