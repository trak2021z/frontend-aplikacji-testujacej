import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import test from "@/stores/modules/test";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        test
    }
});

