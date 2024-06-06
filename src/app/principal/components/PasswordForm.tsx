import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LockIcon from '@assets/icons/lock.svg?react';
import ShowIcon from '@assets/icons/eyes-show.svg?react';
import HideIcon from '@assets/icons/eyes-hide.svg?react';

import {
  PASSWORD_MAXLENGTH,
  PASSWORD_MINLENGTH,
  passwordMatched,
  passwordValidator
} from '@shared/validators/form.validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import Loader from '@shared/components/partials/Loader';
import { reset, resetPassword } from 'app/auth/authSlice';
import ACTION_TYPES from 'app/stores/action-types';
import { useNavigate } from 'react-router-dom';

const PasswordForm = () => {
  const [isShowPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const {
    register,
    formState: { errors, dirtyFields },
    watch,
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData.type === ACTION_TYPES.AUTH.RESET_PASSWORD) {
      if (authData.data && !authData.isLoading) {
        toast('Your password was updated successfully', {
          type: 'success',
          theme: 'colored'
        });
        navigate('/');
        dispatch(reset());
      } else if (authData.hasError) {
        toast(authData.error, {
          type: 'error',
          theme: 'colored'
        });
      }
    }
  }, [authData]);

  const toggleShowPassword = (name: string) => {
    setShowPassword(prev => {
      prev[name] = !prev[name];
      return { ...prev };
    });
  };

  const updatePassword: SubmitHandler<any> = (data) => {
    dispatch(resetPassword(data));
  };

  return (
    <form className="form-password" onSubmit={ handleSubmit(updatePassword) }>
      <div className="form-group">
        <div className="form-control">
          <LockIcon className="prev-icon" />
          <input
            type={ isShowPassword.password ? "text" : "password" }
            name="password"
            id="password"
            className="form-field"
            placeholder="New password"
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
        { authData.isLoading ? <Loader /> : "Reset" }
      </button>
    </form>
  );
};

export default PasswordForm;
