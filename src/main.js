import Vue from 'vue';
import App from '@/App';

import fly from './api/request';
import store from './store/store'

Vue.config.productionTip = false;

Vue.prototype.$store=store;

Vue.prototype.$fly = fly;

App.mpType = 'app';

const app = new Vue(App);
app.$mount();
