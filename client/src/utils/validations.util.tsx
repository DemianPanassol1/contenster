import { TFunction } from 'i18next';

const emailValidation = (t: TFunction<['common', 'validations'], undefined>) => ({
  required: t('validations:email.required'),
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: t('validations:email.pattern'),
  },
});

const genericInputValidation = (
  t: TFunction<['common', 'validations'], undefined>,
  length = 75
) => ({
  required: t('validations:generic.required'),
  maxLength: {
    value: length,
    message: t('validations:generic.maxLength', { length }),
  },
});

const passwordValidation = (
  t: TFunction<['common', 'validations'], undefined>,
  length = 5
) => ({
  required: t('validations:password.required'),
  minLength: {
    value: length,
    message: t('validations:password.minLength', { length }),
  },
});

const phoneValidation = (t: TFunction<['common', 'validations'], undefined>) => ({
  required: t('validations:phone.required'),
  pattern: {
    value: /(?:\()[0-9]{2}(?:\))\s[0-9]{4,5}\s[0-9]{4,5}/,
    message: t('validations:phone.pattern'),
  },
});

export { emailValidation, passwordValidation, phoneValidation, genericInputValidation };
