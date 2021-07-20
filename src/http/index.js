import axios from 'axios';
import { requestCode, rootConfig, environment } from '../utils/varbile';
import { toast } from '../utils/function';
import store from '@/redux/store';
import Tools from '@/utils';
import { localStorage } from '@/assets/js/storage';
import { history } from '@/assets/js/history';
import * as types from '@/redux/constants/actionType';

const tools = new Tools();

const http = axios.create();

http.defaults.withCredentials = true;

http.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers['AccessToken'] = localStorage.getItem('token');
    }

    // store.dispatch({ type: types.LOADING_START }); // 触发loading设置为true

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    let token = response.headers.AccessToken;

    if (token) {
      axios.defaults.headers.common['AccessToken'] = token; // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    }

    store.dispatch({ type: types.LOADING_END }); // 触发loading设置为false

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 *
 * @param {String} method                             // 请求的类型
 * @param {String} url                                // 请求地址
 * @param {Object} data | @default {}                 // 接受的参数
 * @param {String} baseURL  | @default apiBaseUrl     // 根路劲
 * @param {Number} isShowToast | @default 1           // 是否显示错误的toast,默认显示
 * @param {String} responseType | @default json       // 响应的格式
 * @param {Boolean} isLoading | @default true         // 是否开启loading
 */

export const resquest = (
  method = 'get',
  url,
  data = {},
  baseURL = rootConfig.backend,
  isShowToast = 1,
  responseType = 'json',
  isLoading = true,
) => {
  isLoading && store.dispatch({ type: types.LOADING_START }); // 触发loading设置为true
  return new Promise((resolve) => {
    const environmentParps = environment(); // 环境变量
    let root = '';
    if (baseURL === rootConfig.backend) {
      root = environmentParps.backendUrl;
    }
    let option = {
      method,
      url,
      params: method === 'get' ? tools.delEmptyString(data) : {},
      data: method === 'post' ? tools.delEmptyString(data) : {},
      baseURL: root,
      responseType,
    };
    http
      .request(option)
      .then(
        (res) => {
          if (res.data.code === requestCode.successCode) {
            resolve(res.data);
          } else if (res.data.code === requestCode.noVoidToken) {
            resolve(res.data);
            localStorage.clear();
            // history.push('/login');
          } else {
            isShowToast === 1 && toast(requestCode.failedCode, res.data.message);
            resolve(res.data);
          }
        },
        (error) => {
          store.dispatch({ type: types.LOADING_END }); // 触发loading设置为false
          error.response && error.response.data
            ? toast(requestCode.failedCode, error.response.data.message || '未知错误')
            : toast(requestCode.failedCode, '请求出错，请重试');
        },
      )
      .catch((err) => {
        store.dispatch({ type: types.LOADING_END }); // 触发loading设置为false

        toast(requestCode.serverErrorCode, '服务异常');
      });
  });
};
