import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AuthHelper from '@core/helpers/auth.helper';
import { environment } from 'config/environment';
import ERROR_CODE from '@shared/constants/error-code';
import { signOut } from '@shared/utils/auth.util';
import { ENDPOINT } from 'config/endpoint';

export default class ApiService {
  axiosInstance: AxiosInstance;
  authHelper: AuthHelper;

  constructor() {
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
      resolve(resp.data);
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

  handleRefreshToken(successCb?: () => void) {

    return this.post(
      [ENDPOINT.auth.refreshToken], {},
      this.authHelper.setRootHeader()
    ).then((res: any) => {
      this.authHelper.setAccessToken(res.user_token);

      if (successCb) {
        successCb();
      }
    }).catch(err => {
      // Handle err
    });
  }

  private async _handleError(error: AxiosError) {
    // Detect refresh Token
    // if (error.isAxiosError && error.response?.status === 401) {
    //   const originalRequest = error.config;
    //   const req = await this.authHelper.handleRefreshToken(originalRequest);
    //   return this.axiosInstance(req);
    // }

    // Make error model before promise
    if (error.isAxiosError && error.response) {
      const errorStatus = error.response.status;
      const errorData: any = error.response.data;
      // Axios error
      if (errorStatus === 401) {
        signOut();
      } else if (errorStatus === 403) {
        const errorCode = errorData?.error?.code;
        if ([ERROR_CODE.USER_RESOURCE_DENY, ERROR_CODE.WORKSPACE_RESOURCE_DENY].includes(errorCode)) {
          this.handleRefreshToken()
            .then(() => {
              if (errorCode === ERROR_CODE.USER_RESOURCE_DENY) {
                this._handleRedirectPage('/app/user/suspended-account');
              } else if (errorCode === ERROR_CODE.WORKSPACE_RESOURCE_DENY) {
                this._handleRedirectPage('/app/user/workspaces');
              }
            })
            .catch(() => {
              //
            });
        }
      } else if (errorStatus === 503) {
        this._handleRedirectPage('/app/error/maintenance');
      }
    }

    return Promise.reject(error);
  }

  private _handleRedirectPage = url => {
    window.onbeforeunload = null;
    window.location.href = `${environment.clientBaseUrl}${url}`;
  }
}
