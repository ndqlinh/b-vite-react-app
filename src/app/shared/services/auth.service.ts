import AuthHelper from '@core/helpers/auth.helper';
import { ENDPOINT } from '@config/endpoint';
import ApiService from './api.service';

interface ResetPasswordBody {
  password_reset_token: string;
  new_password: string;
}

interface SignUpBodyRequest {
  email: string;
  password: string;
  office_name: string;
  display_name: string;
}

export class AuthService extends AuthHelper {
  http = new ApiService();

  constructor() {
    super();
  }

  async signIn(body: any) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.auth.signin], body);
  }

  async resetPassword(body: ResetPasswordBody) {
    return this.http.patch([ENDPOINT.auth.resetPassword], body);
  }

  async forgotPassword(email: string) {
    return this.http.post([ENDPOINT.auth.forgotPassword], { email });
  }

  async signUp(body: SignUpBodyRequest) {
    return this.http.post([ENDPOINT.auth.signup], body);
  }

  refreshToken() {
    this.http.post([ENDPOINT.auth.refreshToken], {}, this.setRootHeader())
      .then((res: any) => {
        this.setCurrentOffice('');
        this.setAccessToken(res.user_token);
      })
      .catch(err => {
        // Handle err
      });
  }

  resetUserToken(token: string) {
    this.cleanupToken();
    this.setCurrentOffice('');
    this.setAccessToken(token);
  }
}
