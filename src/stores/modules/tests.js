import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    tests: null,
    testScenario: null
}

const actions = {
    async getAllTests({commit}) {
        return axios.get('test/', {headers: authHeader()})
            .then(response => {
                commit('setTests', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    },

    async getTestScenarioById({commit}, id) {
        return axios.get(`test/${id}`, {headers: authHeader()})
            .then(response => {
                commit('setTestScenario', response.data)
                return response
            })
            .catch(error => {
                return error.response
            });
    }
}

const getters = {
    getTests: state => state.tests,
    getTestScenario: state => state.testScenario
}

const mutations = {
    setTests: (state, tests) => {
        state.tests = tests;
    },
    setTestScenario: (state, testScenario) => {
        state.testScenario = testScenario;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}