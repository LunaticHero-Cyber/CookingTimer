import {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

export async function storeKey(config: InternalAxiosRequestConfig) {
  config.baseURL = Config.BASE_URL;

  return config;
}

export function responseInterceptor(response: AxiosResponse) {
  console.log('response', response); // don't remove it, for debug
  if (typeof response.data === 'string') {
    return Promise.reject('invalid response');
  }
  return response;
}
