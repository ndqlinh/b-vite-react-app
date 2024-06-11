const RESOURCES = {
  auth: 'auth'
};

export const ENDPOINT = {
  auth: {
    signin: `${RESOURCES.auth}/signin`,
    signup: `${RESOURCES.auth}/signup`,
    forgotPassword: `${RESOURCES.auth}/forgot-password`,
    refreshToken: `${RESOURCES.auth}/renew`,
    signout: `${RESOURCES.auth}/signout`,
    sso: `${RESOURCES.auth}/sso`,
  },
  profile: 'profile',
  task: 'task',
  resetPassword: `reset-password`,
}
