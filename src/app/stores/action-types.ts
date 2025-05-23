import { ENDPOINT } from '@config/endpoint';

const ACTION_TYPES = {
  AUTH: {
    SIGN_IN: ENDPOINT.auth.signin,
    SIGN_UP: ENDPOINT.auth.signup,
    RESET_PASSWORD: ENDPOINT.resetPassword,
    SSO: ENDPOINT.auth.sso,
    AUTHORIZATION: ENDPOINT.auth.authorization
  },
  TODO: {
    SAVE: `${ENDPOINT.task}/save`,
    LIST: `${ENDPOINT.task}/list`,
    DELETE: `${ENDPOINT.task}/delete`,
    FIND: `${ENDPOINT.task}/find`
  },
  ACCOUNT: {
    GET: `${ENDPOINT.profile}/get`,
    UPDATE: `${ENDPOINT.profile}/update`
  }
};

export default ACTION_TYPES;
