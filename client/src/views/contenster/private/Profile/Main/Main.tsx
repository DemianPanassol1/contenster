import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm, FieldValues, Control, SubmitHandler } from 'react-hook-form';

import {
  emailValidation,
  phoneValidation,
  genericInputValidation,
} from '../../../../../utils/validations.util';
import { GET_SYNC_USER } from '../../../../../routes/contenster/global';
import { useGET, useUserSession } from '../../../../../utils/hooks.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';
import { GET_FUNCTIONALITY_OPTIONS } from '../../../../../routes/contenster/options';
import { GET_USER_INFO, PUT_USER_INFO } from '../../../../../routes/contenster/profile';

import Input from '../../../../../components/Input';
import Wrapper from '../../../../../components/Wrapper';
import FileUpload from '../../../../../components/FileUpload';
import Autocomplete from '../../../../../components/Autocomplete';

interface FormFields {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  imageId: string;
  preferenceId: string;
}

const fields: FormFields = {
  id: '',
  name: '',
  email: '',
  username: '',
  phone: '',
  imageId: '',
  preferenceId: '',
};

const Main: React.FC = () => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });

  const theme = useTheme();

  const session = useUserSession();
  const { handleOnSubmit } = useGlobalContext();
  const { t } = useTranslation(['common', 'validations']);
  const { data, isLoading, refresh } = useGET(GET_USER_INFO);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      type: 'PUT',
      url: PUT_USER_INFO,
      body: content,
      onSuccess() {
        refresh();
        refresh(GET_SYNC_USER);
      },
    });
  };

  useEffect(() => {
    if (!isLoading && data) {
      handlePopulateFields(setValue, fields, data);
    }
  }, [isLoading, data]);

  return (
    <Wrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButtonContent={t('common:save')}
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
          label={t('validations:completeName.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.name?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="email"
          label={t('validations:email.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={emailValidation(t)}
          helperText={errors.email?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="username"
          label={t('validations:username.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.username?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="phone"
          mask="+## (##) #####-####"
          label={t('validations:phone.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={phoneValidation(t)}
          helperText={errors.phone?.message}
          containerStyle={{ margin: '0' }}
        />
        <Autocomplete
          name="preferenceId"
          label={t('validations:preferencialPage.field')}
          controller={control as unknown as Control<FieldValues>}
          urlData={GET_FUNCTIONALITY_OPTIONS}
          bodyContent={{
            roleId: session?.role.id,
            establishmentId: session?.establishment.id,
          }}
          helperText={errors.preferenceId?.message}
          inputStyle={{ margin: '0 0 1.5rem' }}
        />
      </Box>
      <FileUpload
        fileId={watch('imageId')}
        label={t('common:ProfilePicture')}
        onImageUpload={(fileId) => setValue('imageId', fileId)}
      />
    </Wrapper>
  );
};

export default Main;
