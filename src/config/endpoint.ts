const RESOURCES = {
  auth: 'auth'
};

export const ENDPOINT = {
  auth: {
    signin: `${RESOURCES.auth}/signin`,
    signup: `${RESOURCES.auth}/signup`,
    forgotPassword: `${RESOURCES.auth}/forgot-password`,
    resetPassword: `${RESOURCES.auth}/reset-password`,
    refreshToken: `${RESOURCES.auth}/refresh-token`
  }
}
