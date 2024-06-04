import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import UserIcon from '@assets/icons/user-outline.svg?react';
import EmailIcon from '@assets/icons/email.svg?react';
import GenderIcon from '@assets/icons/gender.svg?react';
import CalendarIcon from '@assets/icons/calendar-light.svg?react';

import Loader from '@shared/components/partials/Loader';
import SelectBox from '@shared/components/partials/Select';

import {
  emailValidator,
  firstName,
  lastName
} from '@shared/validators/form.validator';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: Date;
}

const Profile = () => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dob: new Date()
  };

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

  const onSubmit: SubmitHandler<ProfileData> = () => {};

  return (
    <div className="profile-detail">
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
        <button className="btn btn-primary btn-submit">
          Update
        </button>
      </form>
    </div>
  )
};

export default Profile;
