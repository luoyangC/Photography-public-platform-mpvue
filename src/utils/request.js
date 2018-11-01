import Fly from 'flyio/dist/npm/wx';

const fly = new Fly();
const host = 'http://127.0.0.1:8000/api';


fly.interceptors.request.use((config,promise)=>{
  config.headers["X-Tag"]="flyio";
  return config;
});

fly.config.baseURL=host;

export default fly
