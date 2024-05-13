import { AuthStorage } from '@core/helpers/auth.helper';

export class AuthStorageHelper implements AuthStorage {
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
      if (key.includes('access_token')) {
        this.removeToken(key);
      }
    });
  }
}
