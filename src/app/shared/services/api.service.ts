import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import AuthHelper from '@core/helpers/auth.helper';
import { environment } from 'config/environment';
import { ENDPOINT } from 'config/endpoint';
import { signOut } from '@shared/utils/auth.util';

let isTokenRefreshing: boolean = false;
let retryQueue: any[] = [];

export default class ApiService {
  axiosInstance: AxiosInstance;
  authHelper: AuthHelper;


  constructor() {
    // this.retryQueue = [];
    this.authHelper = new AuthHelper();
    this.axiosInstance = axios.create({
      baseURL: environment.apiBaseUrl,
      headers: { 'Content-Type': 'application/json' }
    });
    this._setInterceptors();
  }

  createURL(uri: (string | object)[]) {
    let paramsUrl: string | object;
    if (typeof uri[uri.length - 1] !== 'string') {
      paramsUrl = uri.pop();
      let url = uri.join('/');
      Object.keys(paramsUrl).forEach(x => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join('/');
    }
  }

  get(uri: (string | object)[], params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), { params, ...moreConfigs });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  put(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  patch(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.patch(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  delete(uri: (string | object)[], moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(this.createURL(uri), moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  private _handleRespond(request: any, resolve, reject) {
    return request.then((resp: AxiosResponse) => {
      resolve(resp?.data);
    }).catch((err: any) => {
      reject(err);
    });
  }

  private _setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => this.authHelper.setAuthHeader(request)
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => this._handleError(error)
    );
  }

  private _processRetryQueue() {
    console.log(55555.1111, retryQueue);
    retryQueue.forEach(({ config, resolve, reject }) => {
      this.axiosInstance(config)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });

    // retryQueue = [];
  }

  async handleRefreshToken(request) {
    const refreshToken = this.authHelper.getRefreshToken();
    return new Promise<any>((resolve, reject) => {
      return this.post(
        [ENDPOINT.auth.refreshToken],
        { token: refreshToken }
      ).then(({ data }) => {
        if (data) {
          console.log(55555);
          this.authHelper.setAccessToken(data);
          this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data;
          request.headers['Authorization'] = 'Bearer ' + data;
          this._processRetryQueue();
          resolve(this.axiosInstance(request));
        } else {
          console.log(66666, 'SIGNOUT');
          retryQueue = [];
          signOut();
        }
      }).catch(err => {
        console.log(77777);
        signOut();
        reject(err);
      }).finally(() => {
        console.log(88888);
        isTokenRefreshing = false;
      });
    });
  }

  private async _handleError(error: AxiosError) {
    if (error.isAxiosError && error.response?.status === 401) {
      const originalRequest: AxiosRequestConfig = error.config;
      console.log(11111);
      if (isTokenRefreshing) {
        console.log(22222, originalRequest);
        return new Promise(function(resolve, reject) {
          retryQueue.push({ originalRequest, resolve, reject });
        });
      }

      isTokenRefreshing = true;

      return this.handleRefreshToken(originalRequest);
    }

    return Promise.reject(error);
  }
}
