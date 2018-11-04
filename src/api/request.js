import Fly from 'flyio/dist/npm/wx';
import store from '../store/store';

const fly = new Fly();
const host = 'http://127.0.0.1:8000/api';


fly.interceptors.request.use((config,promise)=>{
  if (store.state.userInfo.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `JWT ${store.state.userInfo.token}`;
  }
  return config;
});

fly.config.baseURL=host;

fly.interceptors.response.use(
  undefined,
  error => {
    let res = error.response;
    switch (res.status) {
      case 401:
        console.log('未登录 或者token过期');
      case 403:
        console.log('您没有该操作权限');
      case 500:
        console.log('服务器错误');
    }
    return Promise.reject(error.response.data)
    // 返回接口返回的错误信息
  });


export default fly
