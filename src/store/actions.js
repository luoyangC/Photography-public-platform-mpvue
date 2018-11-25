import * as types from './mutation-types'
// 提交mutation
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args)
}

export const setInfo = makeAction(types.SET_INFO)
export const setSystem = makeAction(types.SET_SYSTEM)
export const setTopic = makeAction(types.SET_TOPIC)
export const setLocation = makeAction(types.SET_LOCATION)