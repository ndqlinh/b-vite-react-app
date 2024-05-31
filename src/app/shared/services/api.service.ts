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

interface FailedRequest {
  config: AxiosRequestConfig,
  resolve: any,
  reject: any
}

let isTokenRefreshing: boolean = false;
let retryQueue: FailedRequest[] = [];

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

  private _processRetryQueue(token) {
    retryQueue.forEach(({ config, resolve, reject }) => {
      config.headers['Authorization'] = 'Bearer ' + token;
      this.axiosInstance(config)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });

    retryQueue = [];
  }

  async handleRefreshToken(request) {
    const refreshToken = this.authHelper.getRefreshToken();
    return new Promise<any>((resolve, reject) => {
      return this.post(
        [ENDPOINT.auth.refreshToken],
        { token: refreshToken }
      ).then(({ data }: any) => {
        if (data) {
          this.authHelper.setAccessToken(data);
          this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data;
          request.headers['Authorization'] = 'Bearer ' + data;
          this._processRetryQueue(data);
          resolve(this.axiosInstance(request));
        } else {
          retryQueue = [];
          signOut();
        }
      }).catch(err => {
        signOut();
        reject(err);
      }).finally(() => {
        isTokenRefreshing = false;
      });
    });
  }

  private async _handleError(error: AxiosError) {
    if (error.isAxiosError && error.response?.status === 401) {
      const originalRequest: AxiosRequestConfig = error.config;
      if (isTokenRefreshing) {
        if (originalRequest.url === ENDPOINT.auth.refreshToken) {
          signOut();
        }
        return new Promise(function(resolve, reject) {
          const isExisted = retryQueue.find(item => item.config.url === originalRequest.url);
          if (!isExisted) {
            retryQueue.push({ config: originalRequest, resolve, reject });
          }
        });
      } else {
        isTokenRefreshing = true;
        return this.handleRefreshToken(originalRequest);
      }
    }

    return Promise.reject(error);
  }
}
