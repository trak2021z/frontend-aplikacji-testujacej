import Vue from 'vue';
import Router from "vue-router";
import TestScenarios from "@/components/TestScenarios";
import DoneTests from "@/components/DoneTests";
import TestResults from "@/components/TestResults";
import GenerateTest from "@/components/GenerateTest";

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
            path: '/test/done',
            name: 'doneTests',
            component: DoneTests,
        },
        {
            path: '/test/done/:id',
            name: 'testResults',
            component: TestResults,
        },
        {
            path: '/test/generate/',
            name: 'generateTest',
            component: GenerateTest,
        },
        {
            path: '*',
            name: 'default',
            component: TestScenarios,
        },
    ]
})

export default router

