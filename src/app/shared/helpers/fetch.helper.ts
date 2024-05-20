import { environment } from '@config/environment';
import AuthHelper from '@core/helpers/auth.helper';

export default class FetchHelper {
  authHelper: AuthHelper;

  constructor() {
    this.authHelper = new AuthHelper();
  }

  private _createUrl(uri: string, queryParams?: string | Record<string, string>) {
    const baseUrl = environment.apiBaseUrl;
    const url = new URL(uri, baseUrl);
    let queryString: string;

    if (typeof queryParams !== 'string') {
      queryString = new URLSearchParams(queryParams).toString();
    }

    return queryString ? `${url}?${queryString}` : url;
  }

  private _onRequest(
    uri: string,
    queryParams?: string | Record<string, string>,
    moreConfig?: any
  ) {
    const requestUrl = this._createUrl(uri, queryParams);
    const token = this.authHelper.getAccessToken();
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };

    return fetch(requestUrl, {
      ...requestOptions,
      ...moreConfig,

    })
  }

  async get(url: string, queryParams?: string | Record<string, string>){
    return this._onRequest(url, queryParams).then(async (response) => {
      const result = await response.json();
      return result;
    }).catch(error => {
      throw error;
    });
  }

  async post(url: string, requestBody: any) {
    return this._onRequest(url, null, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    }).then(async (response) => {
      const result = await response.json();
      return result;
    }).catch(error => {
      throw error;
    });
  }

  async put(url: string, requestBody: any) {
    return this._onRequest(url, null, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    }).then(async (response) => {
      const result = await response.json();
      return result;
    }).catch(error => {
      throw error;
    });
  }

  async delete(url: string, requestBody: any) {
    return this._onRequest(url, null, {
      method: 'DELETE',
      body: JSON.stringify(requestBody)
    }).then(async (response) => {
      const result = await response.json();
      return result;
    }).catch(error => {
      throw error;
    });
  }
}
