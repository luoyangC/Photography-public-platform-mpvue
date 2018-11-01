import fly from '../utils/request'

// 获取Test接口
export const getTest = () => { return fly.get(`/test/`) };

// 添加Test接口
export const addTest = (data) => { return fly.post(`/test/`, data) };

// 删除Test接口
export const delTest = (id) => { return fly.delete(`/test/${id}/`) };
