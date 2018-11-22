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

// 添加动态接口
export const addActivity = (data) => { return fly.post(`/activity/`, data) }

// 删除动态接口
export const delActivity = (id) => { return fly.delete(`/activity/${id}/`) }

// 获取约拍列表
export const getAgreement = () => { return fly.get(`/agreement/`) }

// 获取评论列表
export const getComment = (params) => { return fly.get(`/comment/`, params) }

// 获取评论详情
export const getCommentById = (id) => { return fly.get(`/comment/${id}/`) }

// 添加评论接口
export const addComment = (data) => { return fly.post(`/comment/`, data) }

// 删除评论接口
export const delComment = (id) => { return fly.delete(`/comment/${id}/`) }

// 添加回复接口
export const addReply = (data) => { return fly.post(`/reply/`, data) }

// 删除回复接口
export const delReply = (id) => { return fly.delete(`/reply/${id}/`) }

// 获取主题接口
export const getTopic = () => { return fly.get(`/topic/`) }

// 获取主题详情接口
export const getTopicById = (id) => { return fly.get(`/topic/${id}`) }

// 添加点赞接口
export const addLike = (data) => { return fly.post(`/like/`, data) }

// 取消点赞接口
export const delLike = (id) => { return fly.delete(`/like/${id}`) }

// 获取收藏列表
export const getKeep = (params) => { return fly.get(`/keep/`, params) }

// 添加收藏接口
export const addKeep = (data) => { return fly.post(`/keep/`, data) }

// 取消收藏接口
export const delKeep = (id) => { return fly.delete(`/keep/${id}/`) }

// 获取用户关注列表
export const getFollow = (params) => { return fly.get(`/follow/`, params) }

// 添加关注接口
export const addFollow = (data) => { return fly.post(`/follow/`, data) }

// 取消关注接口
export const delFollow = (id) => { return fly.delete(`/follow/${id}`) }
