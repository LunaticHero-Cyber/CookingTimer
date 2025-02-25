import axios from 'axios';

import {responseInterceptor, storeKey} from './axiosUtils';

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use(storeKey, function (error) {
  console.error('error request', error);
  return Promise.reject(error);
});

instance.interceptors.response.use(responseInterceptor, function (error) {
  console.error('error response', error);
  return Promise.reject(error);
});

export {instance};
