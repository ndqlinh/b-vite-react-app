import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import UserIcon from '@assets/icons/user-outline.svg?react';
import EmailIcon from '@assets/icons/email.svg?react';
import GenderIcon from '@assets/icons/gender.svg?react';
import CalendarIcon from '@assets/icons/calendar-light.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import ShowIcon from '@assets/icons/eyes-show.svg?react';
import HideIcon from '@assets/icons/eyes-hide.svg?react';
import GoogleIcon from '@assets/icons/google.svg?react';
import FacebookIcon from '@assets/icons/facebook.svg?react';

import {
  emailValidator,
  firstName,
  lastName,
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordMatched,
  passwordValidator
} from '@shared/validators/form.validator';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import Loader from '@shared/components/partials/Loader';
import SelectBox from '@shared/components/partials/Select';
import { Link } from 'react-router-dom';
import { signup } from '../authSlice';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: Date;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dob: new Date(),
    password: '',
    confirmPassword: ''
  };

  const [isShowPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const {
    register,
    control,
    formState: { errors, dirtyFields },
    setValue,
    watch,
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues
  });
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleShowPassword = (name: string) => {
    setShowPassword(prev => {
      prev[name] = !prev[name];
      return { ...prev };
    });
  };

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    dispatch(signup(data));
  };

  return (
    <div className="auth-page signup-page">
      <div className="card">
        <h1 className="page-title">Create your account</h1>
        <h3 className="page-subtitle">We are excited to see you here</h3>
        <div className="auth-sso">
          <button className="btn btn-outline btn-login-sso">
            <GoogleIcon className="btn-icon" />
            <span className="btn-text">Google</span>
          </button>
          <button className="btn btn-outline btn-login-sso">
            <FacebookIcon className="btn-icon" />
            <span className="btn-text">Facebook</span>
          </button>
        </div>
        <div className="division-txt">
          <p>or continue with email</p>
        </div>
        <form className="form-signup mb-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <div className="form-control">
                  <UserIcon className="prev-icon" />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-field"
                    placeholder="First name"
                    { ...register("firstName", firstName()) }
                  />
                </div>
                <p className="txt-red error-msg">{ errors?.firstName?.message }</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <div className="form-control">
                  <UserIcon className="prev-icon" />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-field"
                    placeholder="Last name"
                    { ...register("lastName", lastName()) }
                  />
                </div>
                <p className="txt-red error-msg">{ errors?.lastName?.message }</p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <EmailIcon className="prev-icon" />
              <input
                type="text"
                name="email"
                id="email"
                className="form-field"
                placeholder="Email"
                { ...register("email", emailValidator()) }
              />
            </div>
            <p className="txt-red error-msg">{ errors?.email?.message }</p>
          </div>
          <div className="row">
            <div className="col-6">
              <SelectBox
                name="gender"
                formRegister={ register("gender") }
                setFormValue={ setValue }
                options={[
                  {
                    name: 'Male',
                    value: 'male'
                  },
                  {
                    name: 'Female',
                    value: 'female'
                  },
                  {
                    name: 'Other',
                    value: 'other'
                  }
                ]}
                preIcon={ <GenderIcon /> }
                placeholder="Gender"
                selectedValue={ defaultValues.gender }
              />
            </div>
            <div className="col-6">
              <div className="form-group">
                <div className="form-control">
                  <Controller
                    control={ control }
                    name="dob"
                    render={({ field }) => (
                      <DatePicker
                        showIcon
                        className="form-field cursor-pointer"
                        calendarClassName="calendar-picker-popup"
                        placeholderText="Select date"
                        onChange={ (date) => field.onChange(date) }
                        onKeyDown={ (event) => event.preventDefault() }
                        selected={ field.value }
                        minDate={ new Date("1/1/2010") }
                        maxDate={ new Date() }
                        showYearDropdown
                        icon={ <CalendarIcon className="prev-icon txt-xl" /> }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <LockIcon className="prev-icon" />
              <input
                type={ isShowPassword.password ? "text" : "password" }
                name="password"
                id="password"
                className="form-field"
                placeholder="Password"
                maxLength={ PASSWORD_MAXLENGTH }
                minLength={ PASSWORD_MINLENGTH }
                { ...register("password", passwordValidator()) }
              />
              <div className="sub-icon cursor-pointer" onClick={ () => toggleShowPassword('password') }>
                { isShowPassword.password ? <HideIcon /> : <ShowIcon /> }
              </div>
            </div>
            <p className="txt-red error-msg">{ errors?.password?.message }</p>
          </div>
          <div className="form-group mb-8">
            <div className="form-control">
              <LockIcon className="prev-icon" />
              <input
                type={ isShowPassword.confirmPassword ? "text" : "password" }
                name="confirmPassword"
                id="confirmPassword"
                className="form-field"
                placeholder="Confirm password"
                maxLength={ PASSWORD_MAXLENGTH }
                minLength={ PASSWORD_MINLENGTH }
                { ...register("confirmPassword", passwordMatched({
                  isDirty: dirtyFields,
                  value: watch('password')
                })) }
              />
              <div className="sub-icon cursor-pointer" onClick={ () => toggleShowPassword('confirmPassword') }>
                { isShowPassword.confirmPassword ? <HideIcon /> : <ShowIcon /> }
              </div>
            </div>
            <p className="txt-red error-msg">{ errors?.confirmPassword?.message }</p>
          </div>
          <button className="btn btn-primary btn-submit" disabled={ authData.isLoading }>
            { authData.isLoading ? <Loader /> : "Sign up" }
          </button>
        </form>
        <p className="txt-sm txt-center">
          Already have an account? <Link className="txt-blue" to='/auth/signin'>Sign in now</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
