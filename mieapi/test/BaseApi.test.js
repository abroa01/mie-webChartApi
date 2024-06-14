import { expect } from 'chai';
import sinon from 'sinon';
import fetch from 'node-fetch';
import base64 from 'base-64';
import BaseApi from '../src/core/baseApi.js';
import { BASE_URL, USERNAME, PASSWORD } from '../src/config/apiConfig.js';

global.fetch = fetch;

describe('BaseApi', () => {
    let baseApi;
    let fetchStub;
    let consoleLogStub;

    beforeEach(() => {
        baseApi = new BaseApi();
        fetchStub = sinon.stub(global, 'fetch');
        consoleLogStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
        fetchStub.restore();
        consoleLogStub.restore();
    });

    describe('constructor', () => {
        it('should initialize with default values', () => {
            expect(baseApi.baseUrl).to.equal(BASE_URL);
            expect(baseApi.cookie).to.be.null;
            expect(baseApi.debug).to.be.false;
        });
    });

    describe('initializeSession', () => {
        it('should initialize session and set cookie', async () => {
            const responseHeaders = new Headers();
            responseHeaders.append('set-cookie', 'wc_miehr_anshulmie_session_id=testcookie; Path=/; HttpOnly');
            fetchStub.resolves({
                headers: responseHeaders,
                ok: true,
            });

            await baseApi.initializeSession();

            expect(baseApi.cookie).to.equal('testcookie');
        });

        it('should handle failed session initialization', async () => {
            fetchStub.rejects(new Error('Fetch error'));
            const consoleErrorStub = sinon.stub(console, 'error');

            await baseApi.initializeSession();

            expect(consoleErrorStub.calledOnce).to.be.true;
            consoleErrorStub.restore();
        });

        it('should log debug message if debug is enabled', async () => {
            baseApi.enableDebug(console.log);
            const responseHeaders = new Headers();
            responseHeaders.append('set-cookie', 'wc_miehr_anshulmie_session_id=testcookie; Path=/; HttpOnly');
            fetchStub.resolves({
                headers: responseHeaders,
                ok: true,
            });

            await baseApi.initializeSession();

            expect(consoleLogStub.calledWith('Session initialized with cookie:', 'testcookie')).to.be.true;
        });
    });

    describe('enableDebug', () => {
        it('should enable debug mode and set log function', () => {
            const logFunction = sinon.spy();
            baseApi.enableDebug(logFunction);

            expect(baseApi.debug).to.be.true;
            expect(baseApi.log).to.equal(logFunction);
        });
    });

    describe('getRequest', () => {
        it('should handle no session cookie', async () => {
            const callback = sinon.spy();
            const consoleErrorStub = sinon.stub(console, 'error');

            await baseApi.getRequest('GET', 'testEndpoint', {}, callback);

            expect(consoleErrorStub.calledOnce).to.be.true;
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('No session cookie available');

            consoleErrorStub.restore();
        });

        it('should successfully make GET request', async () => {
            baseApi.cookie = 'testcookie';
            const responseData = { data: 'test' };
            fetchStub.resolves({
                ok: true,
                json: async () => responseData,
            });
            const callback = sinon.spy();

            await baseApi.getRequest('GET', 'testEndpoint', 'options', callback);

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][1]).to.deep.equal(responseData);
        });

        it('should handle failed GET request', async () => {
            baseApi.cookie = 'testcookie';
            fetchStub.resolves({
                ok: false,
                status: 500,
                json: async () => ({}),
            });
            const callback = sinon.spy();

            await baseApi.getRequest('GET', 'testEndpoint', 'options', callback);

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('HTTP error! status: 500');
        });

        it('should log debug message if debug is enabled', async () => {
            baseApi.enableDebug(console.log);
            baseApi.cookie = 'testcookie';
            const responseData = { data: 'test' };
            fetchStub.resolves({
                ok: true,
                json: async () => responseData,
            });
            const callback = sinon.spy();

            await baseApi.getRequest('GET', 'testEndpoint', 'options', callback);

            expect(consoleLogStub.calledWith(sinon.match.string)).to.be.true;
        });
    });

    describe('putRequest', () => {
        it('should handle no session cookie', async () => {
            const callback = sinon.spy();
            const consoleErrorStub = sinon.stub(console, 'error');

            await baseApi.putRequest('PUT', {}, 'testEndpoint', callback);

            expect(consoleErrorStub.calledOnce).to.be.true;
            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('No Session Cookie Available');

            consoleErrorStub.restore();
        });

        it('should successfully make PUT request', async () => {
            baseApi.cookie = 'testcookie';
            const responseData = { data: 'test' };
            fetchStub.resolves({
                ok: true,
                json: async () => responseData,
            });
            const callback = sinon.spy();

            await baseApi.putRequest('PUT', {}, 'testEndpoint', callback);

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][1]).to.deep.equal(responseData);
        });

        it('should handle failed PUT request', async () => {
            baseApi.cookie = 'testcookie';
            fetchStub.resolves({
                ok: false,
                status: 500,
                json: async () => ({}),
            });
            const callback = sinon.spy();

            await baseApi.putRequest('PUT', {}, 'testEndpoint', callback);

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0].message).to.equal('HTTP error! status: 500 | undefined | undefined');
        });

        it('should log debug message if debug is enabled', async () => {
            baseApi.enableDebug(console.log);
            baseApi.cookie = 'testcookie';
            const responseData = { data: 'test' };
            fetchStub.resolves({
                ok: true,
                json: async () => responseData,
            });
            const callback = sinon.spy();

            await baseApi.putRequest('PUT', {}, 'testEndpoint', callback);

            expect(consoleLogStub.calledWith(sinon.match.string)).to.be.true;
        });
    });
});
