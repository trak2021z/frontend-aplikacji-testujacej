import Vue from 'vue';
import Router from "vue-router";
import Login from "@/components/Login";
import Main from "@/components/Main";
import store from './stores/store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/main')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            beforeEnter: ifAuthenticated
        },
        {
            path: '*',
            name: 'default',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
    ]
})

export default router

