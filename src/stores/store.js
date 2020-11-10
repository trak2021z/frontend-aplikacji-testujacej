import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import test from "@/stores/modules/test";
import tests from "@/stores/modules/tests";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        test,
        tests
    }
});

