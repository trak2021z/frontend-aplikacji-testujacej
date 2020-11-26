import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import router from './router';
import jQuery from 'jquery';
import 'bootstrap';
import 'popper.js';
import './assets/css/app.css';
import './fai';
import './assets/css/app.css';
import './fai';
import axios from 'axios';
import VueAxios from 'vue-axios'
import store from './stores/store';
import JwPagination from 'jw-vue-pagination';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URI;

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.component('jw-pagination', JwPagination);
Vue.component('loading', Loading);
Vue.use(Chartkick.use(Chart));

Chartkick.options = {
  round: 2,
  download: true
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')