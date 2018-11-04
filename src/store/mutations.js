import * as types from './mutation-types';


export default {
  [types.SET_INFO] (state, data) {
    state.userInfo = {
      token: data.token,
      user: data.user,
    };
  },
}
