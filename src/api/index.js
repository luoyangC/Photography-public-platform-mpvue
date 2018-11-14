import fly from './request'


// 微信登录接口
export const loginWeixin = (data) => { return fly.post(`/weixin/`, data) }

// 邮箱登录接口
export const loginEmail = (data) => { return fly.post(`/login/`, data) }

// 获取邮箱验证码
export const getEmailCode = (data) => { return fly.post(`/code/`, data) }

// 邮箱用户注册
export const createUserByEmail = (data) => { return fly.post(`/user/`, data) }

// 获取用户信息
export const getUserInfo = () => { return fly.get('/user/') }

// 获取动态列表
export const getActivity = (params) => { return fly.get(`/activity/`, params) }

// 获取动态详情
export const getActivityById = (id) => { return fly.get(`/activity/${id}/`) }

// 获取约拍列表
export const getAgreement = () => { return fly.get(`/agreement/`) }

// 获取评论详情
export const getComment = (id) => { return fly.get(`/comment/${id}`) }

// 添加评论接口
export const addComment = (data) => { return fly.post(`/comment/`, data) }

// 添加回复接口
export const addReply = (data) => { return fly.post(`/reply/`, data) }
