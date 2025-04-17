import strings from '@/strings';

const emailValidation = () => ({
  required: strings.validations.email.required,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: strings.validations.email.pattern,
  },
});

const passwordValidation = (minLength: number = 5, maxLength: number = 64) => ({
  required: strings.validations.password.required,
  minLength: {
    value: minLength,
    message: strings.validations.password.minLength(minLength.toString()),
  },
  maxLength: {
    value: maxLength,
    message: strings.validations.password.maxLength(maxLength.toString()),
  },
});

const phoneValidation = (minLength: number = 10, maxLength: number = 15) => ({
  required: strings.validations.phone.required,
  minLength: {
    value: minLength,
    message: strings.validations.phone.minLength(minLength.toString()),
  },
  maxLength: {
    value: maxLength,
    message: strings.validations.phone.maxLength(maxLength.toString()),
  },
  pattern: {
    value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    message: strings.validations.phone.pattern,
  },
});

const genericValidation = (maxLength: number = 75) => ({
  required: strings.validations.generic.required,
  maxLength: {
    value: maxLength,
    message: strings.validations.generic.maxLength(maxLength.toString()),
  },
});

export {
  phoneValidation,
  emailValidation,
  passwordValidation,
  genericValidation,
};
