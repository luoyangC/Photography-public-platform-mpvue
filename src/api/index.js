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
export const getUserInfo = (params) => { return fly.get('/user/', params) }

// 获取指定用户信息
export const getUserInfoById = (id) => { return fly.get(`/user/${id}`) }

// 获取动态列表
export const getActivity = (params) => { return fly.get(`/activity/`, params) }

// 获取动态详情
export const getActivityById = (id) => { return fly.get(`/activity/${id}/`) }

// 添加动态接口
export const addActivity = (data) => { return fly.post(`/activity/`, data) }

// 删除动态接口
export const delActivity = (id) => { return fly.delete(`/activity/${id}/`) }

// 修改动态接口
export const upActivity = (id, data) => { return fly.put(`/activity/${id}/`, data) }

// 获取约拍列表
export const getAgreement = (params) => { return fly.get(`/agreement/`, params) }

// 获取约拍详情
export const getAgreementById = (id) => { return fly.get(`/agreement/${id}/`) }

// 添加约拍接口
export const addAgreement = (data) => { return fly.post(`/agreement/`, data) }

// 删除约拍接口
export const delAgreement = (id) => { return fly.delete(`/agreement/${id}/`) }

// 更新约拍接口
export const upAgreement = (id, data) => { return fly.put(`/agreement/${id}/`, data) }

// 获取评论列表
export const getComment = (params) => { return fly.get(`/comment/`, params) }

// 获取评论详情
export const getCommentById = (id) => { return fly.get(`/comment/${id}/`) }

// 添加评论接口
export const addComment = (data) => { return fly.post(`/comment/`, data) }

// 删除评论接口
export const delComment = (id) => { return fly.delete(`/comment/${id}/`) }

// 获取回复列表
export const getReply = (params) => { return fly.get(`/reply/`, params) }

// 添加回复接口
export const addReply = (data) => { return fly.post(`/reply/`, data) }

// 删除回复接口
export const delReply = (id) => { return fly.delete(`/reply/${id}/`) }

// 获取主题接口
export const getTopic = (params) => { return fly.get(`/topic/`, params) }

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
export const delFollow = (id) => { return fly.delete(`/follow/${id}/`) }

// 获取消息接口
export const getMessage = (params) => { return fly.get(`/message/`, params) }

// 发送消息接口
export const addMessage = (data) => { return fly.post(`/message/`, data) }

// 更新消息接口
export const upMessage = (id, data) => { return fly.put(`/message/${id}/`, data) }
