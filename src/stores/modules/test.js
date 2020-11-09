import axios from 'axios';

const state = {
    test: null,
    testScenarios: null,
    doneTests: null
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
        return axios.get('test/result/')
            .then(response => {
                commit('setDoneTests', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },
}

const getters = {
    getTest: state => state.test,
    allTestScenarios: state => state.testScenarios,
    allDoneTests: state => state.doneTests
}

const mutations = {
    setTest: (state, test) => {
        state.test = test;
    },
    setTestScenarios: (state, testScenarios) => {
        state.testScenarios = testScenarios;
    },
    setDoneTests: (state, doneTests) => {
        state.doneTests = doneTests;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}