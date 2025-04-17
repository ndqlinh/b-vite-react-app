import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import UserIcon from '@assets/icons/user-outline.svg?react';
import EmailIcon from '@assets/icons/email.svg?react';
import GenderIcon from '@assets/icons/gender.svg?react';
import CalendarIcon from '@assets/icons/calendar-light.svg?react';
import LoaderIcon from '@assets/icons/loader.svg?react';

import SelectBox from '@shared/components/partials/Select';
import {
  emailValidator,
  firstName,
  lastName,
} from '@shared/validators/form.validator';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { reset, updateProfile } from '../principalSlice';
import ACTION_TYPES from 'app/stores/action-types';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: Date;
}

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.account);
  const defaultValues = {
    firstName: profile?.data?.firstName || '',
    lastName: profile?.data?.lastName || '',
    email: profile?.data?.email || '',
    gender: profile?.data?.gender?.toLowerCase() || '',
    dob: profile?.data?.dob || new Date(),
  };

  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    if (profile.type === ACTION_TYPES.ACCOUNT.UPDATE) {
      if (profile.hasError) {
        toast(profile.error, {
          type: 'error',
          theme: 'colored',
        });
        dispatch(reset());
      } else if (profile.data && !profile.isLoading) {
        toast('Your profile was updated successfully', {
          type: 'success',
          theme: 'colored',
        });
      }
    }

    if (profile.type === ACTION_TYPES.ACCOUNT.GET) {
      if (profile.data) {
        setValue('firstName', profile.data.firstName);
        setValue('lastName', profile.data.lastName);
        setValue('email', profile.data.email);
        setValue('gender', profile.data.gender.toLowerCase());
        setValue('dob', profile.data.dob);
      }
    }
  }, [profile]);

  const doUpdateProfile: SubmitHandler<ProfileData> = (data) => {
    dispatch(updateProfile(data));
  };

  return (
    <form
      className="flex flex-col gap-3 mb-4 max-w-[100vw] w-[500px] mx-auto"
      onSubmit={handleSubmit(doUpdateProfile)}
    >
      <div className="flex gap-2">
        <div className="form-group w-1/2">
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
          <p className="text-red-500 text-sm">
            {`${errors?.firstName?.message || ''}`}
          </p>
        </div>
        <div className="form-group w-1/2">
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
          <p className="text-red-500 text-sm">
            {`${errors?.lastName?.message || ''}`}
          </p>
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
        <p className="text-red-500 text-sm">{`${
          errors?.email?.message || ''
        }`}</p>
      </div>
      <div className="flex gap-2 mb-4">
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
        <div className="form-group w-1/2">
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
                  wrapperClassName="w-full"
                  calendarClassName="calendar-picker-popup"
                  placeholderText="Select date"
                  onChange={(date: any) => field.onChange(date)}
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
      <button
        className="font-medium text-white rounded px-5 py-2.5 text-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50"
        disabled={
          profile?.type === ACTION_TYPES.ACCOUNT.UPDATE && profile.isLoading
        }
      >
        {profile?.type === ACTION_TYPES.ACCOUNT.UPDATE && profile.isLoading ? (
          <LoaderIcon className="inline w-4 h-4 me-3 animate-spin" />
        ) : (
          'Update'
        )}
      </button>
    </form>
  );
};

export default ProfileForm;
