import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  emailValidation,
  genericInputValidation,
  passwordValidation,
  phoneValidation,
} from '../../../../../utils/validations.util';
import { GET_SYNC_USER } from '../../../../../routes/contenster/global';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';

import { useGET, useNavigate, useUserSession } from '../../../../../utils/hooks.util';

import Input from '../../../../../components/Input';
import Switch from '../../../../../components/Switch';
import Wrapper from '../../../../../components/Wrapper';
import FileUpload from '../../../../../components/FileUpload';
import Select from '../../../../../components/Select';
import { GET_ROLE_OPTIONS } from '../../../../../routes/contenster/options';

interface FormFields {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  isActive: boolean;
  isBlocked: boolean;
  imageId: string;
  roleId: string;
  preferenceId: string;
  password: string;
  repeatPassword: string;
  userEstablishmentRole: Record<string, unknown>[];
  userEstablishmentRoleToDelete: Record<string, unknown>[];
  establishmentId: string;
  permissionType: string;
}

const fields: FormFields = {
  id: '',
  name: '',
  email: '',
  username: '',
  phone: '',
  isActive: false,
  isBlocked: false,
  imageId: '',
  roleId: '',
  preferenceId: '',
  password: '',
  repeatPassword: '',
  establishmentId: '',
  permissionType: '',
  userEstablishmentRole: [],
  userEstablishmentRoleToDelete: [],
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
    setError,
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
    if (content.password && content.password !== content.repeatPassword) {
      setError('repeatPassword', {
        type: 'custom',
        message: t('validations:repeatPassword.passwordsDoNotMatch'),
      });
      return;
    }

    content.userEstablishmentRole = content.userEstablishmentRole.map((item) => ({
      id: item.id,
      roleId: (item.role as { id: number }).id,
      establishmentId: (item.establishment as { id: number }).id,
    }));

    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      url: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }
        refresh(GET_SYNC_USER);
        setTimeout(() => navigate(-1), 500);
      },
    });
  };

  useEffect(() => {
    if (getContentUrl && !isLoading && data) {
      handlePopulateFields(setValue, fields, data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    setValue('permissionType', permissionType);
    setValue('establishmentId', (session?.establishment.id ?? '') as string);
  }, []);

  return (
    <Wrapper
      hasCancelButton
      onCancel={() => navigate(-1)}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonContent={t('common:save')}
      cancelButtonContent={t('common:cancel')}
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
        {
          /* permissionType === 'establishment' */ true && (
            <Select
              name="roleId"
              label={t('validations:role.field')}
              controller={control as unknown as Control<FieldValues>}
              validation={genericInputValidation(t)}
              urlData={GET_ROLE_OPTIONS}
              bodyContent={{
                establishmentId: (session?.establishment.id ?? '') as string,
              }}
              inputStyle={{ margin: '0' }}
            />
          )
        }
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
              gridColumn: 1,
            },
          }}
        >
          <Input
            name="password"
            type="password"
            label={`${t('validations:password.field')}${pageType === 'create' ? ' *' : ''}`}
            controller={control as unknown as Control<FieldValues>}
            validation={pageType === 'create' ? passwordValidation(t) : undefined}
            helperText={errors.password?.message}
          />
          <Input
            name="repeatPassword"
            type="password"
            label={`${t('validations:repeatPassword.field')}${pageType === 'create' ? ' *' : ''}`}
            controller={control as unknown as Control<FieldValues>}
            validation={pageType === 'create' ? passwordValidation(t) : undefined}
            helperText={errors.repeatPassword?.message}
          />
        </Box>
      </Box>
      {permissionType === 'general' && (
        <Box>
          {/* TODO: Implementar CrudTable */}
          {/* <CrudTable
            watch={watch}
            setValue={setValue}
            listName="userEstablishmentRole"
            deleteListName="userEstablishmentRoleToDelete"
            controller={control as unknown as Control<FieldValues>}
            columns={[
              {
                name: t('validations:establishment.field'),
                field: 'establishment',
                selector: 'establishment',
                type: 'text',
                searchable: true,
                sortable: true,
              },
              {
                name: t('validations:role.field'),
                field: 'role',
                selector: 'role',
                type: 'text',
                searchable: true,
                sortable: true,
              },
            ]}
            fields={[]}
          /> */}
        </Box>
      )}
      <FileUpload
        fileId={watch('imageId')}
        label={t('common:ProfilePicture')}
        onImageUpload={(fileId) => setValue('imageId', fileId)}
      />
    </Wrapper>
  );
};

export default Save;
