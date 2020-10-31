import Vue from 'vue';
import Router from "vue-router";
import TestScenarios from "@/components/TestScenarios";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: TestScenarios,
        },
        {
            path: '/test/scenarios',
            name: 'testScenarios',
            component: TestScenarios,
        },
        {
            path: '*',
            name: 'default',
            component: TestScenarios,
        },
    ]
})

export default router

