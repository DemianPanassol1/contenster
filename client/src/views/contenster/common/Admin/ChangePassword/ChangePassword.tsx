import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useGlobalContext } from '../../../../../contexts/global.context';
import { passwordValidation } from '../../../../../utils/validations.util';
import { PUT_RESET_PASSWORD } from '../../../../../routes/contenster/global';

import Input from '../../../../../components/Input';
import Dialog from '../../../../../components/Dialog';

interface FormFields {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const fields: FormFields = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
};

const ChangePassword: React.FC = () => {
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });

  const {
    toggleDialog,
    handleOnSubmit,
    state: { loading },
  } = useGlobalContext();

  const { t } = useTranslation(['common', 'validations']);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (content.newPassword !== content.repeatPassword) {
      setError('repeatPassword', {
        type: 'value',
        message: t('validations:repeatPassword.mustMatch'),
      });
      return;
    }

    handleOnSubmit({
      url: PUT_RESET_PASSWORD,
      type: 'PUT',
      body: content,
      message: t('common:passwordResetSuccess'),
      onSuccess: () => toggleDialog(),
    });
  };

  return (
    <Dialog
      onClose={reset}
      loading={loading}
      content="password"
      dialogWidth="xs"
      onSubmit={handleSubmit(onSubmit)}
      title={t('common:changePassword')}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '1.5rem 1rem',
          margin: '0 0 1rem',
          gridTemplateColumns: '1fr',
        }}
      >
        <Input
          name="oldPassword"
          type="password"
          label={t('validations:oldPassword.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={passwordValidation(t)}
          containerStyle={{ margin: '0' }}
          helperText={errors.oldPassword?.message}
        />
        <Input
          name="newPassword"
          type="password"
          label={t('validations:newPassword.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={passwordValidation(t)}
          containerStyle={{ margin: '0' }}
          helperText={errors.newPassword?.message}
        />
        <Input
          name="repeatPassword"
          type="password"
          label={t('validations:repeatPassword.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={passwordValidation(t)}
          containerStyle={{ margin: '0' }}
          helperText={errors.repeatPassword?.message}
        />
      </Box>
    </Dialog>
  );
};

export default ChangePassword;
