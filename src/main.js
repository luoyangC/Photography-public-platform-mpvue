import Vue from 'vue';
import App from '@/App';
import MpvueRouterPatch from 'mpvue-router-patch';

import fly from './utils/request';

Vue.config.productionTip = false;

Vue.use(MpvueRouterPatch);
Vue.prototype.$fly = fly;

App.mpType = 'app';

const app = new Vue(App);
app.$mount();
