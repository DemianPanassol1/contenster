import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useForm, FieldValues, Control, SubmitHandler } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';
import {
  emailValidation,
  phoneValidation,
  genericValidation,
} from '@/utils/validations.util';
import { useGET } from '@/hooks/swr.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';

import Input from '@/components/Input';
import Wrapper from '@/components/Wrapper';
import FileUpload from '@/components/FileUpload';

interface FormFields {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  imageId: string;
}

const fields: FormFields = {
  id: '',
  name: '',
  email: '',
  username: '',
  phone: '',
  imageId: '',
};

const Main: React.FC = () => {
  const { watch, control, setValue, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const theme = useTheme();

  const { handleOnSubmit } = useGlobalContext();
  const { data, isLoading, refresh } = useGET(
    routes.CONTENSTER.PROFILE.GET_USER_INFO
  );

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      type: 'PUT',
      endpoint: routes.CONTENSTER.PROFILE.PUT_USER_INFO,
      body: content,
      onSuccess() {
        refresh();
        refresh(routes.CONTENSTER.GLOBAL.GET_SYNC_USER);
      },
    });
  };

  useEffect(() => {
    if (!isLoading && data) {
      handlePopulateFields(
        setValue,
        fields as unknown as Record<string, unknown>,
        data as unknown as Record<string, unknown>
      );
    }
  }, [isLoading, data]);

  return (
    <Wrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButtonContent={strings.actions.save}
      cancelButtonContent={strings.actions.cancel}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '1.5rem 2rem',
          margin: '0 0 2rem',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr 1fr',
          },
        }}
      >
        <Input
          name="name"
          label={strings.validations.completeName.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="email"
          label={strings.validations.email.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={emailValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="username"
          label={strings.validations.username.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="phone"
          mask="+## (##) #####-####"
          label={strings.validations.phone.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={phoneValidation()}
          containerStyle={{ margin: '0' }}
        />
      </Box>
      <FileUpload
        fileId={watch('imageId')}
        label={strings.common.profilePicture}
        onImageUpload={(fileId) => setValue('imageId', fileId)}
      />
    </Wrapper>
  );
};

export default Main;
