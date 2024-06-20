import { expect } from 'chai';
import sinon from 'sinon';
import { ApiService } from '../mieapi/src/apis/ApiService.js';
import BaseApi from '../mieapi/src/core/baseApi.js';
import { endpoints } from '../mieapi/src/config/apiConfig.js';

describe('ApiService', () => {
    let apiService;

    beforeEach(() => {
        apiService = new ApiService();
    });

    describe('getApi', () => {
        it('should call initializeSession if no cookie is present', async () => {
            const initializeSessionStub = sinon.stub(apiService, 'initializeSession').resolves();
            const getRequestStub = sinon.stub(apiService, 'getRequest').callsFake((method, endpoint, options, callback) => callback(null, {}));
            const callback = sinon.spy();
            await apiService.getApi('testApi', {}, callback);

            expect(initializeSessionStub.calledOnce).to.be.true;
            initializeSessionStub.restore();
            getRequestStub.restore();
        });

        it('should call getRequest with correct parameters', async () => {
            const initializeSessionStub = sinon.stub(apiService, 'initializeSession').resolves();
            const getRequestStub = sinon.stub(apiService, 'getRequest').callsFake((method, endpoint, options, callback) => callback(null, {}));
            sinon.stub(apiService, 'getEndpoints').returns('testEndpoint');
            const callback = sinon.spy();
            await apiService.getApi('testApi', {}, callback);

            expect(getRequestStub.calledWith('GET', 'testEndpoint', {}, callback)).to.be.true;
            initializeSessionStub.restore();
            getRequestStub.restore();
        });

        it('should handle errors correctly', async () => {
            const initializeSessionStub = sinon.stub(apiService, 'initializeSession').rejects(new Error('Session Error'));
            const callback = sinon.spy();
            await apiService.getApi('testApi', {}, callback);

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0]).to.be.an('error');
            initializeSessionStub.restore();
        });
    });

    describe('putApi', () => {
        it('should call initializeSession if no cookie is present', async () => {
            const initializeSessionStub = sinon.stub(apiService, 'initializeSession').resolves();
            const putRequestStub = sinon.stub(apiService, 'putRequest').callsFake((method, json, endpoint, callback) => callback(null, {}));
            const callback = sinon.spy();
            await apiService.putApi('testApi', {}, callback);

            expect(initializeSessionStub.calledOnce).to.be.true;
            initializeSessionStub.restore();
            putRequestStub.restore();
        });

        it('should call putRequest with correct parameters', async () => {
            const initializeSessionStub = sinon.stub(apiService, 'initializeSession').resolves();
            const putRequestStub = sinon.stub(apiService, 'putRequest').callsFake((method, json, endpoint, callback) => callback(null, {}));
            sinon.stub(apiService, 'getEndpoints').returns('testEndpoint');
            const callback = sinon.spy();
            await apiService.putApi('testApi', {}, callback);

            expect(putRequestStub.calledWith('PUT', {}, 'testEndpoint', callback)).to.be.true;
            initializeSessionStub.restore();
            putRequestStub.restore();
        });

        it('should handle errors correctly', async () => {
            const initializeSessionStub = sinon.stub(apiService, 'initializeSession').rejects(new Error('Session Error'));
            const callback = sinon.spy();
            await apiService.putApi('testApi', {}, callback);

            expect(callback.calledOnce).to.be.true;
            expect(callback.args[0][0]).to.be.an('error');
            initializeSessionStub.restore();
        });
    });

    describe('getEndpoints', () => {
        it('should return the correct endpoint for a given apiName', () => {
            const apiName = 'testApi';
            endpoints.testapi = 'testEndpoint';
            const endpoint = apiService.getEndpoints(apiName);

            expect(endpoint).to.equal('testEndpoint');
        });

        it('should return null if no endpoint is found', () => {
            const apiName = 'nonExistentApi';
            const endpoint = apiService.getEndpoints(apiName);

            expect(endpoint).to.be.null;
        });
    });
});
