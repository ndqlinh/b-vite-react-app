import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AuthHelper from '@core/helpers/auth.helper';

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
    <div className="flex h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export default Auth;
