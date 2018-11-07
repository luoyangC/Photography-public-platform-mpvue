import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const userInfo = {token: null, user: null};

const state = {
  userInfo
};

export default new Vuex.Store({
  mutations,
  getters,
  actions,
  state,
})