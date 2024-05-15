import { InternalAxiosRequestConfig } from 'axios';
import JwtHelper from './jwt.helper';

export interface AuthHelperInterface {
  defaultHeader: () => Record<string, unknown>;
  getAuthHeader: () => Record<string, unknown>;
  isValidToken: () => boolean;
  isAuthenticated: () => boolean;
  isCurrentUser(uid: string): boolean;
  userRole: () => string | number;
  getUserInfo: () => Record<string, unknown>;
  signOut: () => void;
}

export interface TokenKeys {
  accessTokenKey: string;
  refreshTokenKey: string;
}

const strategies = {
  jwt: JwtHelper,
  __default__: JwtHelper
};

class DynamicAuth {
  [x: string]: any;

  constructor(type: string) {
    const currentAuth = strategies[type];
    Object.setPrototypeOf(DynamicAuth.prototype, new currentAuth());
  }
}

// tslint:disable-next-line: max-classes-per-file
export default class AuthHelper extends DynamicAuth {

  constructor(type = 'jwt') {
    super(type);
  }

  defaultHeader() {
    if (super.defaultHeader) {
      return super.defaultHeader();
    }
    // default code here
  }

  getAuthHeader() {
    if (super.getAuthHeader) {
      return super.getAuthHeader();
    }
    // default code here
  }

  /**
   * Token conditions: custom checking access token
   * @method isValidToken
   * @return {boolean}    `true` : valid token for calling API
   *                      `false`: need to refresh access_token
   */
  isValidToken(): boolean {
    /**
     * Adding conditions here
     */
    // TODO

    if (super.isValidToken) {
      return super.isValidToken();
    }
    // default code here
  }

  setAuthHeader(request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> | InternalAxiosRequestConfig {
    if (this.getAccessToken() && !request.headers?.Authorization) {
      if (this.isValidToken()) {
        Object.assign(request.headers, this.getAuthHeader());
      } else {
        return this.handleRefreshToken(request);
      }
    }
    return request;
  }

  // Todo: Need to handle invalid token
  setRootHeader() {
    if (this.getRootAccessToken()) {
      return {
        headers: {
          'Authorization': `Bearer ${this.getRootAccessToken()}`
        }
      };
    } else {
      return {};
    }
  }

  /**
   * Handle refresh token with current API request
   * @method handleRefreshToken
   * @param   [request] - current API request that have expired access_token or get 401 Unauthorized
   * @returns Promise<AxiosRequestConfig>
   */
  handleRefreshToken (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    // TODO: handle refresh token
    return null;
  }

}
