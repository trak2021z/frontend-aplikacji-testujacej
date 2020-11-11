import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";
import moment from "moment";

const dateFormat = "DD.MM.YYYY HH:mm:ss";

const state = {
    test: null,
    testScenarios: null,
    doneTests: null,
    doneTest: null,
    createTestResponse: null
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
        const response = await axios.post(`test/call/`, 
        {test:data.testId, num_users:data.testUsers, max_calls:data.testAmount}, 
        {headers: authHeader()});

        commit('setCreateTestResponse', response.data)
        return response;
    },
}

const getters = {
    getTest: state => state.test,
    allTestScenarios: state => state.testScenarios,
    allDoneTests: state => state.doneTests,
    doneTest: state => state.doneTest,
    createTestResponse: state => state.createTestResponse
}

const mutations = {
    setTest: (state, test) => {
        state.test = test;
    },
    setTestScenarios: (state, testScenarios) => {
        state.testScenarios = testScenarios;
    },
    setDoneTests: (state, doneTests) => {
        var tests = doneTests.map(function (test){
            return test.testCalls.map(function (testCall){
                testCall.name = test.name;
                testCall.start_date = new moment(testCall.start_date).format(dateFormat);
                testCall.end_date = new moment(testCall.end_date).format(dateFormat);

                return testCall;
            });
        });

        state.doneTests = tests.flat();
    },
    setDoneTest: (state, doneTest) => {
        doneTest.start_date = new moment(doneTest.start_date).format(dateFormat);
        doneTest.end_date = new moment(doneTest.end_date).format(dateFormat);
        state.doneTest = doneTest;
    },
    setCreateTestResponse: (state, createTestResponse) => {
        state.createTestResponse = createTestResponse;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}