import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '@core/helpers/jwt.helper';

function isAuthenticated(): boolean {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return !!token;
}

export function privateRoute(Wrapped) {
  return (props) => isAuthenticated() ? <Wrapped /> : <Navigate to="/auth/signin" />;
}
