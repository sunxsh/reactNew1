import { useState, useEffect } from 'react';
import axios from 'axios'
import { requestCode,rootConfig,environment } from '@/utils/varbile'
import Tools from '@/utils'
import { delay } from '@/utils/function'
import {localStorage} from '@/assets/js/storage';

const tools = new Tools();

export const http = (method = 'get', url, data = {}, baseURL = rootConfig.backend, responseType = 'json') => {
  return new Promise((resolve,reject) => {
    const environmentParps = environment(); // 环境变量
    let root='';
    if(baseURL === rootConfig.backend){
      root = environmentParps.backendUrl;
    }
    let option = {
      method,
      url,
      params: method === 'get' ? tools.delEmptyString(data) : {},
      data: method === 'post' ? tools.delEmptyString(data) : {},
      baseURL:root,
      responseType
    };
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(config => {

      if (localStorage.getItem('token')) {
        config.headers['AccessToken'] =localStorage.getItem('token');
      }

      return config;

    }, error => {
      return Promise.reject(error)
    });

    axios.interceptors.response.use((response) => {

      let token = response.headers.AccessToken;

      if (token) {
        axios.defaults.headers.common['AccessToken'] = token; // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
      }

      return response;

    }, (error) => {
      return Promise.reject(error)
    });

    axios.request(option).then(res => {
      if (res.data.code === requestCode.successCode) {
        resolve(res.data);
      } else {
        resolve(res.data);
      }
    }, error => {
      reject(error.response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * @author lgf
 * @description 异步请求hooks
 * @param {Promise<any>} fn
 * @param {Array<any>} dependencies
 * @param {any} defaultValue
 * @returns asyncData, setAsyncData, asyncLoading, error, request
 */
const useAsync = (fn, dependencies, defaultValue = [])=>{
  const [asyncData, setAsyncData] = useState(defaultValue);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = () => {
    let cancel = false; // 定义cancel标志位
    setAsyncLoading(true);
    fn()
      .then(res => {
        setAsyncLoading(false);
        setAsyncData(res);
      })
      .catch((error) => {
        if (!cancel) {
          setError(error);
          delay(()=>setAsyncLoading(false),4000);
        }
      })
      .finally(() => {
        if (!cancel) {
          setAsyncLoading(false);
        }
      });
    return () => { // 请求的方法返回一个 取消掉这次请求的方法
      cancel = true;
    };
  };

   // 这样在下一次调用这个useEffect时，会先取消掉上一次的请求。

  useEffect(() => {
    const cancelRequest = request();
    return () => {
      cancelRequest();
    };
  }, dependencies);

  return { asyncData, setAsyncData, asyncLoading, error, request };

};

export default useAsync;
