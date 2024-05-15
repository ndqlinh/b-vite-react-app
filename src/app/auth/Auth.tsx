import AuthHelper from '@core/helpers/auth.helper';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const auth = new AuthHelper();

  useEffect(() => {
    const isAuthenticated = auth.isAuthenticated();
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  return (
    <Outlet />
  );
};

export default Auth;
