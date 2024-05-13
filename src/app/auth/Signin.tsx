import { useForm } from 'react-hook-form';

import EmailIcon from '@assets/email.svg?react';
import LockIcon from '@assets/lock.svg?react';
import CheckboxIcon from '@assets/checkbox.svg?react';
import GoogleIcon from '@assets/google.svg?react';
import FacebookIcon from '@assets/facebook.svg?react';

import {
  emailValidator,
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordValidator
} from 'app/shared/validators/form.validator';

const Signin = () => {
  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

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
        <form className="form-login mb-8">
          <div className="form-group">
            <EmailIcon className="icon" />
            <input
              type="text"
              name="email"
              id="email"
              className="input"
              placeholder="Email"
              { ...register("email", emailValidator()) }
            />
            <p className="txt-red error-msg">{ errors?.email?.message }</p>
          </div>
          <div className="form-group">
            <LockIcon className="icon" />
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Password"
              maxLength={ PASSWORD_MAXLENGTH }
              minLength={ PASSWORD_MINLENGTH }
              { ...register("password", passwordValidator()) }
            />
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
