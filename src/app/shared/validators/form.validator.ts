/* eslint-disable no-irregular-whitespace */
export const PATTERN_EMAIL = /^[A-Z0-9]+(([_.-][a-zA-Z0-9]+)*)+(([+][A-Z0-9]+)*)+@[A-Z0-9]+-?[A-Z0-9]+(\.[A-Za-z]{2,})*(\.[A-Za-z‌​]{2,})$/i;
export const PASSWORD_MINLENGTH = 6;
export const PASSWORD_MAXLENGTH = 32;

export function emailValidator(isRequired?: boolean) {
  return {
    required: {
      value: isRequired || true,
      message: 'Email is required'
    },
    pattern: {
      value: PATTERN_EMAIL,
      message: 'Email is invalid'
    },
  };
}

export function passwordValidator() {
  return {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: {
      value: PASSWORD_MINLENGTH,
      message: `Please enter at least ${ PASSWORD_MINLENGTH } characters`
    },
    maxLength: {
      value: PASSWORD_MAXLENGTH,
      message: `Please enter less than ${ PASSWORD_MAXLENGTH } characters`
    },
    validate: (value: string) => !value.trim().length ? 'Password is required' : null
  };
}
