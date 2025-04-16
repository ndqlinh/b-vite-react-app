import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import UserIcon from '@assets/icons/user-outline.svg?react';
import EmailIcon from '@assets/icons/email.svg?react';
import GenderIcon from '@assets/icons/gender.svg?react';
import CalendarIcon from '@assets/icons/calendar-light.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import ShowIcon from '@assets/icons/eyes-show.svg?react';
import HideIcon from '@assets/icons/eyes-hide.svg?react';
import GoogleIcon from '@assets/icons/google.svg?react';
import FacebookIcon from '@assets/icons/facebook.svg?react';
import LoaderIcon from '@assets/icons/loader.svg?react';

import {
  emailValidator,
  firstName,
  lastName,
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordMatched,
  passwordValidator,
} from '@shared/validators/form.validator';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import SelectBox from '@shared/components/partials/Select';
import { reset, signup } from '../authSlice';

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
    confirmPassword: '',
  };

  const [isShowPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const {
    register,
    control,
    formState: { errors, dirtyFields },
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData.hasError) {
      toast(authData.error, {
        type: 'error',
        theme: 'colored',
      });
      dispatch(reset());
    } else if (authData.data) {
      toast('Your account was created successfully', {
        type: 'success',
        theme: 'colored',
      });
      dispatch(reset());
      navigate('/auth/signin');
    }
  }, [authData]);

  const toggleShowPassword = (name: string) => {
    setShowPassword((prev) => {
      prev[name] = !prev[name];
      return { ...prev };
    });
  };

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    dispatch(signup(data));
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <div className="rounded overflow-hidden shadow-lg px-8 py-10 max-w-[100vw] w-[500px] bg-white">
        <h1 className="font-bold text-2xl">Create your account</h1>
        <h3 className="text-sm text-gray-600 mb-8">
          We are excited to see you here
        </h3>
        <div className="flex items-center gap-2 w-full">
          <button
            className="flex items-center justify-center gap-2 py-2 px-4 w-full rounded border border-gray-300"
            disabled={authData.isLoading}
          >
            <GoogleIcon className="btn-icon" />
            <span className="btn-text">Google</span>
          </button>
          <button
            className="flex items-center justify-center gap-2 py-2 px-4 w-full rounded border border-gray-300"
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
          <div className="flex gap-2">
            <div className="form-group">
              <div className="relative flex items-center mb-1">
                <UserIcon className="absolute text-gray-400 text-xl left-3" />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`shadow appearance-none border rounded w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.firstName ? 'border-red-500' : ''
                  }`}
                  placeholder="First name"
                  {...register('firstName', firstName())}
                />
              </div>
              <p className="txt-red error-msg">{errors?.firstName?.message}</p>
            </div>
            <div className="form-group">
              <div className="relative flex items-center mb-1">
                <UserIcon className="absolute text-gray-400 text-xl left-3" />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`shadow appearance-none border rounded w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                  placeholder="Last name"
                  {...register('lastName', lastName())}
                />
              </div>
              <p className="txt-red error-msg">{errors?.lastName?.message}</p>
            </div>
          </div>
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
            <p className="txt-red error-msg">{errors?.email?.message}</p>
          </div>
          <div className="flex gap-2">
            <div className="form-group w-1/2">
              <SelectBox
                name="gender"
                formRegister={register('gender')}
                setFormValue={setValue}
                options={[
                  {
                    name: 'Male',
                    value: 'male',
                  },
                  {
                    name: 'Female',
                    value: 'female',
                  },
                  {
                    name: 'Other',
                    value: 'other',
                  },
                ]}
                preIcon={<GenderIcon />}
                placeholder="Gender"
                selectedValue={defaultValues.gender}
              />
            </div>
            <div className="form-group">
              <div className="relative flex items-center mb-1">
                <Controller
                  control={control}
                  name="dob"
                  render={({ field }) => (
                    <DatePicker
                      showIcon
                      className={`shadow appearance-none border rounded w-full !py-3 !px-3 !pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer ${
                        errors.dob ? 'border-red-500' : ''
                      }`}
                      calendarClassName="calendar-picker-popup"
                      placeholderText="Select date"
                      onChange={(date: any) => field.onChange(new Date(date))}
                      onKeyDown={(event) => event.preventDefault()}
                      selected={field.value}
                      maxDate={new Date()}
                      showYearDropdown
                      icon={
                        <CalendarIcon className="absolute text-gray-400 text-xl left-3 !p-0 top-1/2 -translate-y-1/2" />
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="form-group">
              <div className="relative flex items-center mb-1">
                <LockIcon className="absolute text-gray-400 text-xl left-3" />
                <input
                  type={isShowPassword.password ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className={`shadow appearance-none border rounded w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                  maxLength={PASSWORD_MAXLENGTH}
                  minLength={PASSWORD_MINLENGTH}
                  {...register('password', passwordValidator())}
                />
                <div
                  className="absolute right-3 cursor-pointer text-gray-500"
                  onClick={() => toggleShowPassword('password')}
                >
                  {isShowPassword.password ? <HideIcon /> : <ShowIcon />}
                </div>
              </div>
              <p className="txt-red error-msg">{errors?.password?.message}</p>
            </div>
            <div className="form-group mb-4">
              <div className="relative flex items-center mb-1">
                <LockIcon className="absolute text-gray-400 text-xl left-3" />
                <input
                  type={isShowPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  className={`shadow appearance-none border rounded w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Confirm password"
                  maxLength={PASSWORD_MAXLENGTH}
                  minLength={PASSWORD_MINLENGTH}
                  {...register(
                    'confirmPassword',
                    passwordMatched({
                      isDirty: dirtyFields,
                      value: watch('password'),
                    })
                  )}
                />
                <div
                  className="absolute right-3 cursor-pointer text-gray-500"
                  onClick={() => toggleShowPassword('confirmPassword')}
                >
                  {isShowPassword.confirmPassword ? <HideIcon /> : <ShowIcon />}
                </div>
              </div>
              <p className="txt-red error-msg">
                {errors?.confirmPassword?.message}
              </p>
            </div>
          </div>
          <button
            className="font-medium text-white rounded px-5 py-2.5 text-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50"
            disabled={authData.isLoading}
          >
            {authData.isLoading ? (
              <LoaderIcon className="inline w-4 h-4 me-3 animate-spin" />
            ) : (
              'Sign up'
            )}
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link className="text-blue-600" to="/auth/signin">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
