import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LockIcon from '@assets/icons/lock.svg?react';
import ShowIcon from '@assets/icons/eyes-show.svg?react';
import HideIcon from '@assets/icons/eyes-hide.svg?react';

import {
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordMatched,
  passwordValidator,
} from '@shared/validators/form.validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import LoaderIcon from '@assets/icons/loader.svg?react';
import { reset, resetPassword } from 'app/auth/authSlice';
import ACTION_TYPES from 'app/stores/action-types';
import { useNavigate } from 'react-router-dom';

const PasswordForm = () => {
  const [isShowPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const {
    register,
    formState: { errors, dirtyFields },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData.type === ACTION_TYPES.AUTH.RESET_PASSWORD) {
      if (authData.data && !authData.isLoading) {
        toast('Your password was updated successfully', {
          type: 'success',
          theme: 'colored',
        });
        navigate('/');
        dispatch(reset());
      } else if (authData.hasError) {
        toast(authData.error, {
          type: 'error',
          theme: 'colored',
        });
      }
    }
  }, [authData]);

  const toggleShowPassword = (name: string) => {
    setShowPassword((prev) => {
      prev[name] = !prev[name];
      return { ...prev };
    });
  };

  const updatePassword: SubmitHandler<any> = (data) => {
    dispatch(resetPassword(data));
  };

  return (
    <form
      className="flex flex-col gap-3 mb-4 max-w-[100vw] w-[300px] mx-auto"
      onSubmit={handleSubmit(updatePassword)}
    >
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
            placeholder="New password"
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
        <p className="text-red-500 text-sm">{errors?.password?.message}</p>
      </div>
      <div className="form-group">
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
        <p className="text-red-500 text-sm">
          {errors?.confirmPassword?.message}
        </p>
      </div>
      <button
        className="font-medium text-white rounded px-5 py-2.5 text-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50"
        disabled={authData.isLoading}
      >
        {authData.isLoading ? (
          <LoaderIcon className="inline w-4 h-4 me-3 animate-spin" />
        ) : (
          'Reset'
        )}
      </button>
    </form>
  );
};

export default PasswordForm;
