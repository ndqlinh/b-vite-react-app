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

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

export default class ApiService {
  axiosInstance: AxiosInstance;
  authHelper: AuthHelper;
  refreshAndRetryQueue: RetryQueueItem[];
  isTokenRefreshing: boolean;

  constructor() {
    this.refreshAndRetryQueue = [];
    this.isTokenRefreshing = false;
    this.authHelper = new AuthHelper();
    this.axiosInstance = axios.create({
      baseURL: environment.apiBaseUrl,
      // Common header
      headers: {
        'Content-Type': 'application/json',
        ...this.authHelper.defaultHeader()
      }
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

  async handleRefreshToken(successCb?: () => void) {
    const refreshToken = this.authHelper.getRefreshToken();
    return new Promise<any>((resolve, reject) => {
      return this.post(
        [ENDPOINT.auth.refreshToken], {},
        {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        }
      ).then(res => resolve(res)).catch(err => reject(err));
    });
  }

  private _handleRetryQueue() {
    // Retry all requests in the queue with the new token
    this.refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
      console.log('HandleRetryQueue', config);
      config.headers.Authorization = `Bearer ${this.authHelper.getAccessToken()}`;
      this.axiosInstance
        .request(config)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
    // Clear the queue
    this.refreshAndRetryQueue.length = 0;
  }

  private async _handleError(error: AxiosError) {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.isAxiosError && error.response?.status === 401) {
      if (originalRequest.url === ENDPOINT.auth.refreshToken) {
        this.refreshAndRetryQueue.length = 0;
        this.authHelper.signOut();
        window.location.pathname = 'auth/signin';
      } else if (!this.isTokenRefreshing) {
        this.isTokenRefreshing = true;

        try {
          this.handleRefreshToken().then(res => {
            console.log('Refreshed token', res);
            if (res.data) {
              this.authHelper.setAccessToken(res.data);
              this._handleRetryQueue();
              // return this.axiosInstance(originalRequest);
            }
          }).catch(error => {
            this.authHelper.signOut();
            window.location.pathname = '/auth/signin';
          });

        } catch (error) {
          throw error;
        } finally {
          this.isTokenRefreshing = false;
        }

        return new Promise<void>((resolve, reject) => {
          const isExisted = this.refreshAndRetryQueue.find(item => item.config.url === originalRequest.url);
          if (!isExisted) {
            this.refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
            console.log('PUSH RefreshAndRetryQueue', this.refreshAndRetryQueue);
          }
        });
      }
    }
    return Promise.reject(error);
  }
}
