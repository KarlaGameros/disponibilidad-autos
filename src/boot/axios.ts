import { boot } from 'quasar/wrappers';
import axios, { AxiosResponse } from 'axios';
import { EncryptStorage } from 'storage-encryption';

const encryptStorage = new EncryptStorage('SECRET_KEY', 'sessionStorage');
const urlActual: string = window.location.href;
const arrUrl: string[] = urlActual.split(':');
let urlSistemas: string = `${arrUrl[0]}:${arrUrl[1]}`;

let urlAxios: string = '';
if (urlActual.includes('localhost')) {
  urlAxios = 'http://192.168.2.110:9270/api';
  //urlAxios = 'https://gvqf7k95-7289.usw3.devtunnels.ms/api';
  urlSistemas = 'http://192.168.2.110';
} else {
  urlAxios = `${arrUrl[0]}:${arrUrl[1]}:9270/api`;
}

const api = axios.create({ baseURL: urlAxios });

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${encryptStorage.decrypt('key')}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('Su sesión ha expirado, sera redireccionado al logín');
      localStorage.clear();
      window.location.href = `${urlSistemas}:9271?return=false`;
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, urlSistemas };
