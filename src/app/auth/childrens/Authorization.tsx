import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '@shared/components/partials/Loader';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { authorize, reset } from '../authSlice';
import AuthHelper from '@core/helpers/auth.helper';

const Authorization = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = new AuthHelper();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const authData = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (code) {
      dispatch(authorize({ code, provider: searchParams.get('provider') }));
    }
  }, [code]);

  useEffect(() => {
    if (authData.data) {
      const { accessToken, refreshToken } = authData.data;
      auth.setAccessToken(accessToken);
      auth.setRefreshToken(refreshToken);
      dispatch(reset());
      navigate('/');
    } else if (authData.hasError) {
      toast(authData.error, {
        type: 'error',
        theme: 'colored',
      });
      dispatch(reset());
    }
  }, [authData]);

  return (
    <div className="auth-page flex-col">
      <Loader className="section-loader mb-5" />
      <h1>Authorizing...</h1>
    </div>
  );
};

export default Authorization;
