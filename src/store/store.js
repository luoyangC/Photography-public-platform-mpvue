import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const userInfo = null
const systemInfo = null
const curTopic = null

const state = {
  userInfo,
  systemInfo,
  curTopic,
}

export default new Vuex.Store({
  mutations,
  getters,
  actions,
  state,
})
