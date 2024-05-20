import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./jwt.helper";

export interface AuthStorageInterface {
  setToken(key: string, data?: any): void;
  getToken(key: string): void;
  removeToken(key: string): void;
}

export class AuthStorageHelper implements AuthStorageInterface {
  setToken(key: string, token: any) {
    localStorage.setItem(key, token);
  }

  getToken(key: string) {
    return localStorage.getItem(key);
  }

  removeToken(key: string) {
    localStorage.removeItem(key);
  }

  cleanupStorage() {
    localStorage.clear();
  }

  cleanupToken() {
    Object.keys(localStorage).map(key => {
      if (key.includes(ACCESS_TOKEN_KEY) || key.includes(REFRESH_TOKEN_KEY)) {
        this.removeToken(key);
      }
    });
  }
}
