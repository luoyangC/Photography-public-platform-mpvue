import Fly from 'flyio/dist/npm/wx'
import store from '../store/store'

const fly = new Fly();
const host = 'http://127.0.0.1:8000/api/v1';
const token = wx.getStorageSync('token') || '';
// const host = 'http://192.168.43.238:8000/api/v1'


fly.interceptors.request.use((config,promise)=>{
  if (token) {
    config.headers.Authorization = `JWT ${token}`
  }
  return config;
});

fly.config.baseURL=host;

fly.interceptors.response.use(
  undefined,
  error => {
    let res = error.response
    switch (res.status) {
      case 401:
        console.log('未登录 或者token过期')
      case 403:
        console.log('您没有该操作权限')
      case 500:
        console.log('服务器错误')
    }
    return Promise.reject(error.response.data)
  })

export default fly
