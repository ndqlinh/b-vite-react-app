import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import EmailIcon from '@assets/icons/email.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import LoaderIcon from '@assets/icons/loader.svg?react';
import GoogleIcon from '@assets/icons/google.svg?react';
import FacebookIcon from '@assets/icons/facebook.svg?react';
import ShowIcon from '@assets/icons/eyes-show.svg?react';
import HideIcon from '@assets/icons/eyes-hide.svg?react';

import {
  emailValidator,
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordValidator,
} from '@shared/validators/form.validator';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { reset, signin, loginSso } from '../authSlice';
import AuthHelper from '@core/helpers/auth.helper';
import { environment } from 'config/environment';

interface SigninData {
  email: string;
  password: string;
}

const Signin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const [isShowPassword, setShowPassword] = useState(false);

  const auth = new AuthHelper();

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

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    dispatch(signin(data));
  };

  const onLoginSso = (idp: string) => {
    window.location.href = `${environment.apiBaseUrl}auth/sso?idp=${idp}`;
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <div className="rounded overflow-hidden shadow-lg px-8 py-10 min-w-[400px] max-w-[400px] w-full bg-white">
        <h1 className="font-bold text-2xl">Log in to your Account</h1>
        <h3 className="text-sm text-gray-600 mb-8">
          Welcome back! Select method to log in
        </h3>
        <div className="flex items-center gap-2 w-full">
          <button
            className="flex items-center justify-center gap-2 py-2 px-4 w-full rounded border border-gray-300"
            onClick={() => onLoginSso('google')}
            disabled={authData.isLoading}
          >
            <GoogleIcon className="btn-icon" />
            <span className="btn-text">Google</span>
          </button>
          <button
            className="flex items-center justify-center gap-2 py-2 px-4 w-full rounded border border-gray-300"
            onClick={() => onLoginSso('facebook')}
            disabled={authData.isLoading}
          >
            <FacebookIcon className="btn-icon" />
            <span className="btn-text">Facebook</span>
          </button>
        </div>
        <div className="divide-text w-full flex items-center justify-center my-8 before:border-b before:border-gray-300 before:w-full after:border-b after:border-gray-300 after:w-full">
          <p className="px-2 whitespace-nowrap text-gray-600">
            or continue with email
          </p>
        </div>
        <form
          className="flex flex-col gap-3 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <div className="relative flex items-center mb-1">
              <EmailIcon className="absolute text-gray-400 text-xl left-3" />
              <input
                type="text"
                name="email"
                id="email"
                className={`shadow appearance-none border rounded w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Email"
                {...register('email', emailValidator())}
              />
            </div>
            <p className="text-red-500 text-sm">{errors?.email?.message}</p>
          </div>
          <div className="form-group">
            <div className="relative flex items-center mb-1">
              <LockIcon className="absolute text-gray-400 text-xl left-3" />
              <input
                type={isShowPassword ? 'text' : 'password'}
                name="password"
                id="password"
                className={`shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Password"
                maxLength={PASSWORD_MAXLENGTH}
                minLength={PASSWORD_MINLENGTH}
                {...register('password', passwordValidator())}
              />
              <div
                className="absolute right-3 cursor-pointer text-gray-500"
                onClick={toggleShowPassword}
              >
                {isShowPassword ? <HideIcon /> : <ShowIcon />}
              </div>
            </div>
            <p className="text-red-500 text-sm">{errors?.password?.message}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <a className="text-sm text-blue-600" href="#">
              Forgot Password?
            </a>
          </div>
          <button
            className="font-medium text-white rounded px-5 py-2.5 text-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50"
            disabled={authData.isLoading}
          >
            {authData.isLoading ? (
              <LoaderIcon className="inline w-4 h-4 me-3 animate-spin" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link className="text-blue-600" to="/auth/signup">
            Creat an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
