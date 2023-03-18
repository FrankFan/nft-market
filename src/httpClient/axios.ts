import axios from 'axios';

/**
 * 创建 axios 请求实例
 * 注意：get 请求需要传 params，post 请求需要传 data。
 * @see https://axios-http.com/docs/api_intro
 */
const axiosHttp = axios.create({
  // baseURL: baseURL, // 基础请求地址,由业务方传入,此处不指定
  timeout: 100000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

/**
 * http request 拦截器
 */
axiosHttp.interceptors.request.use(
  (config: any) => {
    config.debug && console.log('request is ', config);
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axiosHttp.interceptors.response.use(
  (response: any) => {
    response.config.debug && console.log('response is ', response);
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default axiosHttp;
