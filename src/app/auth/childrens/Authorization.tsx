import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoaderIcon from '@assets/icons/loader.svg?react';
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
      dispatch(authorize({ code }));
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
    <div className="flex flex-col flex-1 justify-center items-center">
      <LoaderIcon className="inline w-8 h-8 me-3 animate-spin text-blue-600 mb-2" />
      <h2 className="text-xl">Authorizing...</h2>
    </div>
  );
};

export default Authorization;
