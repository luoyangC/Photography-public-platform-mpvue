import fly from './request'

// 获取动态接口
export const getActivity = () => {return fly.get(`/activity/`)};

// 微信登录接口
export const login = (data) => { return fly.post(`/weixin/`, data) };
