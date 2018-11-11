import Vue from 'vue';
import App from '@/App';
import '../static/css/WeUi.css'

import store from './store/store'
// import mpvueToastRegistry from 'mptoast'
//
// mpvueToastRegistry(Vue);

Vue.config.productionTip = false;

Vue.prototype.$store=store;

App.mpType = 'app';

const app = new Vue(App);
app.$mount();
