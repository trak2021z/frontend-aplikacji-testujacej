import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";
import moment from "moment";

const dateFormat = "DD.MM.YYYY HH:mm:ss";

const state = {
    test: null,
    testScenarios: null,
    doneTests: null,
    doneTest: null,
    createTestResponse: null,
    downloadResponse: null,
    downloadCsvResponse: null,
}

const actions = {
    async getTestAction({commit}) {
        return axios.get('https://api.covid19api.com/country/poland/status/confirmed?from=2020-10-01T00:00:00Z&to=2020-10-31T00:00:00Z')
            .then(response => {
                commit('setTest', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async getDoneTests({commit}) {
        return axios.get('test/result/', {headers: authHeader()})
            .then(response => {
                commit('setDoneTests', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async getDoneTest({commit}, id) {
        return axios.get(`test/call/${id}/details`, {headers: authHeader()})
            .then(response => {
                commit('setDoneTest', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    //POST
    async addTest({ commit }, data) {
        return axios.post(`test/call/`,
        {test:data.testId, num_users:data.testUsers, max_calls:data.testAmount}, 
        {headers: authHeader()})
            .then(response =>{
                commit('setCreateTestResponse', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async downloadTestResults({commit}, id){
        return axios.get(`test/call/${id}/json`, {headers: authHeader()})
            .then(response => {
                commit('setDownloadResponse', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async downloadCsvTestResults({commit}, id){
        return axios.get(`test/call/${id}/csv`, {headers: authHeader()})
            .then(response => {
                commit('setCsvDownloadResponse', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    }
}

const getters = {
    getTest: state => state.test,
    allTestScenarios: state => state.testScenarios,
    allDoneTests: state => state.doneTests,
    doneTest: state => state.doneTest,
    createTestResponse: state => state.createTestResponse,
    getDownloadResponse: state => state.downloadResponse,
    getCsvDownloadResponse: state => state.downloadResponse,
}

const mutations = {
    setTest: (state, test) => {
        state.test = test;
    },
    setTestScenarios: (state, testScenarios) => {
        state.testScenarios = testScenarios;
    },
    setDoneTests: (state, doneTests) => {
        /*var tests = doneTests.map(function (test){
            return test.testCalls.map(function (testCall){
                testCall.name = test.name;

                return testCall;
            });
        });*/

        //state.doneTests = tests.flat().sort((a, b) => {return new Date(b.start_date) - new Date(a.start_date)}).map(function (testCall){
        state.doneTests = doneTests.sort((a, b) => {return new Date(b.start_date) - new Date(a.start_date)}).map(function (testCall){
                testCall.start_date = new moment(testCall.start_date).format(dateFormat);
                testCall.end_date = new moment(testCall.end_date).format(dateFormat);
                return testCall;
                });
    },
    setDoneTest: (state, doneTest) => {
        //doneTest.start_date = new moment(doneTest.start_date).format(dateFormat);
        //doneTest.end_date = new moment(doneTest.end_date).format(dateFormat);
        state.doneTest = doneTest;
    },
    setCreateTestResponse: (state, createTestResponse) => {
        state.createTestResponse = createTestResponse;
    },
    setDownloadResponse: (state, downloadResponse) => {
        state.downloadResponse = downloadResponse;
    },
    setCsvDownloadResponse: (state, downloadCsvResponse) => {
        state.downloadCsvResponse = downloadCsvResponse;
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}
