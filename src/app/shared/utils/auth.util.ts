import AuthHelper from '@core/helpers/auth.helper';

const signOut = () => {
  const auth = new AuthHelper();

  // Clear localstorage
  auth.signOut();
  window.location.href = '/auth/login'
};

export { signOut };
