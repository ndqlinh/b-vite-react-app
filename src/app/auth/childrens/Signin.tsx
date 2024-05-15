import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import EmailIcon from '@assets/email.svg?react';
import LockIcon from '@assets/lock.svg?react';
import CheckboxIcon from '@assets/checkbox.svg?react';
import GoogleIcon from '@assets/google.svg?react';
import FacebookIcon from '@assets/facebook.svg?react';
import ShowIcon from '@assets/eyes-show.svg?react';
import HideIcon from '@assets/eyes-hide.svg?react';

import {
  emailValidator,
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordValidator
} from 'app/shared/validators/form.validator';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { reset, signin } from '../authSlice';
import AuthHelper from '@core/helpers/auth.helper';

interface SigninData {
  email: string;
  password: string;
}

const Signin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const [isShowPassword, setShowPassword] = useState(false);

  const auth = new AuthHelper();

  useEffect(() => {
    if (authData.data) {
      const { accessToken, refreshToken } = authData.data;
      dispatch(reset());
      auth.setAccessToken(accessToken);
      auth.setRefreshToken(refreshToken);
      navigate('/');
    }
  }, [authData.data]);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    dispatch(signin(data));
  };

  return (
    <div className="auth-page login-page">
      <div className="card">
        <h1 className="page-title">Log in to your Account</h1>
        <h3 className="page-subtitle">Welcome back! Select method to log in</h3>
        <div className="login-sso">
          <button className="btn btn-login-sso">
            <GoogleIcon className="btn-icon" />
            <span className="btn-text">Google</span>
          </button>
          <button className="btn btn-login-sso">
            <FacebookIcon className="btn-icon" />
            <span className="btn-text">Facebook</span>
          </button>
        </div>
        <div className="division-txt">
          <p>or continue with email</p>
        </div>
        <form className="form-login mb-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="input-wrapper">
              <EmailIcon className="prev-icon" />
              <input
                type="text"
                name="email"
                id="email"
                className="input"
                placeholder="Email"
                { ...register("email", emailValidator()) }
              />
            </div>
            <p className="txt-red error-msg">{ errors?.email?.message }</p>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <LockIcon className="prev-icon" />
              <input
                type={ isShowPassword ? "text" : "password" }
                name="password"
                id="password"
                className="input"
                placeholder="Password"
                maxLength={ PASSWORD_MAXLENGTH }
                minLength={ PASSWORD_MINLENGTH }
                { ...register("password", passwordValidator()) }
              />
              <div className="sub-icon cursor-pointer" onClick={ toggleShowPassword }>
                { isShowPassword ? <HideIcon /> : <ShowIcon /> }
              </div>
            </div>
            <p className="txt-red error-msg">{ errors?.password?.message }</p>
          </div>
          <div className="flex justify-content-between align-items-center mb-8">
            <div className="checkbox">
              <input type="checkbox" name="remember" id="cb" className="checkbox-input" />
              <label htmlFor="cb" className="checkbox-label">
                <span><CheckboxIcon className="checked-icon" /></span>
                <span>Remember me</span>
              </label>
            </div>
            <a className="txt-blue" href="#">Forgot Password?</a>
          </div>
          <button className="btn btn-primary btn-submit">Log in</button>
        </form>
        <p className="txt-sm txt-center">Don't have an account? <a className="txt-blue" href="#">Creat an account</a></p>
      </div>
    </div>
  );
};

export default Signin;
