import React from 'react';
import { Box } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';
import { useGlobalContext } from '@/contexts/global.context';
import { passwordValidation } from '@/utils/validations.util';

import Input from '@/components/Input';
import Dialog from '@/components/Dialog';

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
  const { reset, control, setError, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const {
    toggleDialog,
    handleOnSubmit,
    state: { loading },
  } = useGlobalContext();

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (content.newPassword !== content.repeatPassword) {
      setError('repeatPassword', {
        type: 'value',
        message: strings.validations.repeatPassword.passwordsDoNotMatch,
      });
      return;
    }

    handleOnSubmit({
      endpoint: routes.CONTENSTER.GLOBAL.PUT_RESET_PASSWORD,
      type: 'PUT',
      body: content,
      message: strings.common.passwordResetSuccess,
      onSuccess: () => toggleDialog(null),
    });
  };

  return (
    <Dialog
      onClose={reset}
      loading={loading}
      content="password"
      dialogWidth="xs"
      onSubmit={handleSubmit(onSubmit)}
      title={strings.actions.changePassword}
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
          label={strings.validations.oldPassword.field}
          controller={control as unknown as Control<FieldValues>}
          validation={passwordValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="newPassword"
          type="password"
          label={strings.validations.newPassword.field}
          controller={control as unknown as Control<FieldValues>}
          validation={passwordValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="repeatPassword"
          type="password"
          label={strings.validations.repeatPassword.field}
          controller={control as unknown as Control<FieldValues>}
          validation={passwordValidation()}
          containerStyle={{ margin: '0' }}
        />
      </Box>
    </Dialog>
  );
};

export default ChangePassword;
