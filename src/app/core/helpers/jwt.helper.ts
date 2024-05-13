import { AuthHelperInterface } from './auth.helper';
import * as jwt from 'jsonwebtoken';
import { AuthStorageHelper } from '@core/helpers/auth-storage.helper';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export default class JwtHelper extends AuthStorageHelper implements AuthHelperInterface {

  accessTokenKey: string;
  refreshTokenKey: string;

  constructor() {
    super();
    this.accessTokenKey = ACCESS_TOKEN_KEY;
    this.refreshTokenKey = REFRESH_TOKEN_KEY;
  }

  defaultHeader = () => ({
    // TODO: make default jwt header
  })

  getAuthHeader = () => ({
    'Authorization': `Bearer ${this.getAccessToken()}`
  })

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

    // Default return
    return this._verifyAccessToken().isTokenValid;
  }

  isAuthenticated() {
    const { isTokenValid } = this._verifyAccessToken();
    return isTokenValid;
  }

  isCurrentUser(uid: string) {
    const userInfo = this.getUserInfo();
    return userInfo ? uid?.toString() === userInfo?.id?.toString() : false;
  }

  userRole() {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.role : undefined;
  }

  /**
   * Get user info from user token
   */
  getUserInfo() {
    const { isTokenValid, token } = this._verifyAccessToken();
    if (isTokenValid) {
      const tokenInfo: any = jwt.decode(token);
      return { ...tokenInfo.account, ...tokenInfo.user };
    } else {
      return null;
    }
  }

  /**
   * Get info from user token
   */
  getRootUserInfo() {
    const token = this.getRootAccessToken();
    const isTokenValid = !this._isTokenInvalid(token);

    if (isTokenValid) {
      const tokenInfo: any = jwt.decode(token);
      return tokenInfo?.user;
    } else {
      return null;
    }
  }

  setAccessToken(accessToken: string) {
    this._setTokenKeys();
    return super.setToken(this.accessTokenKey, accessToken);
  }

  getAccessToken() {
    this._setTokenKeys();
    return super.getToken(this.accessTokenKey);
  }

  setRefreshToken(refreshToken: string) {
    this._setTokenKeys();
    return super.setToken(this.refreshTokenKey, refreshToken);
  }

  getRefreshToken() {
    this._setTokenKeys();
    return super.getToken(this.refreshTokenKey);
  }

  signOut() {
    super.cleanupToken();
  }

  setRootAccessToken(accessToken: string) {
    return super.setToken(ACCESS_TOKEN_KEY, accessToken);
  }

  getRootAccessToken() {
    return super.getToken(ACCESS_TOKEN_KEY);
  }

  private _setTokenKeys() {
    this.accessTokenKey = ACCESS_TOKEN_KEY;
    this.refreshTokenKey = REFRESH_TOKEN_KEY;
  }

  private _removeAccessToken() {
    this._setTokenKeys();
    return super.removeToken(this.accessTokenKey);
  }

  private _verifyAccessToken() {
    const token: string | null = this.getAccessToken();
    const isTokenValid = !this._isTokenInvalid(token);
    if (!isTokenValid) {
      this._removeAccessToken();
    }
    return { isTokenValid, token };
  }

  private _isTokenInvalid(token: string) {
    if (!token) {
      return true;
    } else {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return true;
      }
    }
    return false;
  }

  getTokenData(token: string) {
    return jwt.decode(token);
  }
}
