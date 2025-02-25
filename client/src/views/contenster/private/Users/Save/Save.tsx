import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  emailValidation,
  genericInputValidation,
  phoneValidation,
} from '../../../../../utils/validations.util';
import { useGET, useNavigate, useUserSession } from '../../../../../utils/hooks.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';

import Input from '../../../../../components/Input';
import Switch from '../../../../../components/Switch';
import Wrapper from '../../../../../components/Wrapper';
import FileUpload from '../../../../../components/FileUpload';
import Autocomplete from '../../../../../components/Autocomplete';
import { GET_ROLE_OPTIONS } from '../../../../../routes/contenster/options';

interface FormFields {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  isActive: boolean;
  isBlocked: boolean;
  image: { id: string };
  role: { id: string };
}

const fields: FormFields = {
  id: '',
  name: '',
  email: '',
  username: '',
  phone: '',
  isActive: false,
  isBlocked: false,
  image: { id: '' },
  role: { id: '' },
};

interface SaveProps {
  pageType: 'create' | 'edit';
  saveContentUrl: string;
  getContentUrl?: string | null;
  permissionType: Permission['type'];
}

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  getContentUrl = null,
  permissionType,
}) => {
  const {
    watch,
    control,
    setValue,
    // setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });

  const theme = useTheme();
  const navigate = useNavigate();
  const session = useUserSession();
  const { handleOnSubmit } = useGlobalContext();
  const { t } = useTranslation(['common', 'validations']);
  const { data, isLoading, refresh } = useGET(getContentUrl as string);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    return console.log(content);
    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      url: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }

        setTimeout(() => navigate(-1), 500);
      },
    });
  };

  useEffect(() => {
    if (getContentUrl && !isLoading && data) {
      handlePopulateFields(setValue, fields, data);
    }
  }, [isLoading, data]);

  return (
    <Wrapper
      hasCancelButton
      onCancel={() => navigate(-1)}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonContent={t('common:save')}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '1.5rem 2rem',
          margin: '0 0 2rem',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr',
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: '1fr 1fr 1fr',
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
        {permissionType !== 'establishment' && (
          <Autocomplete
            name="role.id"
            label={t('validations:role.field')}
            controller={control as unknown as Control<FieldValues>}
            validation={genericInputValidation(t)}
            urlData={GET_ROLE_OPTIONS}
            bodyContent={{ establishmentId: (session?.establishment.id ?? '') as string }}
            helperText={errors.role?.id?.message}
            inputStyle={{ margin: '0' }}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
              gridColumn: 1,
              // gridRow: 2,
            },
          }}
        >
          <Switch
            name="isActive"
            label={t('validations:isActive.field')}
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.isActive?.message}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="isBlocked"
            label={t('validations:isBlocked.field')}
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.isBlocked?.message}
            inputStyle={{ height: '2.2rem' }}
          />
        </Box>
      </Box>
      <FileUpload
        fileId={watch('image.id')}
        label={t('common:ProfilePicture')}
        onImageUpload={(fileId) => setValue('image.id', fileId)}
      />
    </Wrapper>
  );
};

export default Save;
