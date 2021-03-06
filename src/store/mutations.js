import * as types from './mutation-types';


export default {
  [types.SET_INFO] (state, data) {
    state.userInfo = data
  },
  [types.SET_SYSTEM] (state, data) {
    state.systemInfo = data
  },
  [types.SET_TOPIC] (state, data) {
    state.curTopic = data
  },
  [types.SET_LOCATION] (state, data) {
    state.location = data
  },
  [types.SET_WEBSOCKET] (state, data) {
    state.webSocket = data
  },
  [types.SET_MSGNUMS] (state, data) {
    state.msgNums = data
  }
}
