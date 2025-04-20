import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';

import {
  emailValidation,
  genericValidation,
  passwordValidation,
  phoneValidation,
} from '@/utils/validations.util';
import { useGET } from '@/hooks/swr.hook';
import { useNavigate } from '@/hooks/router.hook';
import { useSession } from '@/hooks/session.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';

import Input from '@/components/Input';
import Switch from '@/components/Switch';
import Select from '@/components/Select';
import Wrapper from '@/components/Wrapper';
import FileUpload from '@/components/FileUpload';

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
  permissionType: Permission['type'];
  getContentUrl?: string | null;
}

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  permissionType,
  getContentUrl = null,
}) => {
  const { watch, control, setValue, setError, handleSubmit } =
    useForm<FormFields>({ defaultValues: fields });

  const theme = useTheme();
  const session = useSession();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { data, isLoading, refresh } = useGET(getContentUrl ?? '');

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (content.password && content.password !== content.repeatPassword) {
      setError('repeatPassword', {
        type: 'custom',
        message: strings.validations.repeatPassword.passwordsDoNotMatch,
      });
      return;
    }

    content.userEstablishmentRole = content.userEstablishmentRole.map(
      (item) => ({
        id: item.id,
        roleId: (item.role as { id: number }).id,
        establishmentId: (item.establishment as { id: number }).id,
      })
    );

    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      endpoint: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }
        refresh(routes.CONTENSTER.GLOBAL.GET_SYNC_USER);
        setTimeout(() => navigate(-1), 500);
      },
    });
  };

  useEffect(() => {
    if (getContentUrl && !isLoading && data) {
      handlePopulateFields(
        setValue,
        fields as unknown as Record<string, unknown>,
        data as unknown as Record<string, unknown>
      );
    }
  }, [isLoading, data]);

  useEffect(() => {
    setValue('permissionType', permissionType);
    setValue('establishmentId', session!.establishment.id.toString());
  }, []);

  return (
    <Wrapper
      hasCancelButton
      onCancel={() => navigate(-1)}
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
          label={strings.validations.name.field + ' *'}
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
        {
          /* permissionType === 'establishment'  true &&*/ <Select
            name="roleId"
            label={strings.validations.role.field + ' *'}
            controller={control as unknown as Control<FieldValues>}
            validation={genericValidation()}
            urlData={routes.CONTENSTER.OPTIONS.GET_ROLE_OPTIONS}
            bodyContent={{
              establishmentId: session!.establishment.id.toString(),
            }}
            inputStyle={{ margin: '0' }}
          />
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
            label={strings.validations.isActive.field}
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="isBlocked"
            label={strings.validations.isBlocked.field}
            controller={control as unknown as Control<FieldValues>}
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
            label={`${strings.validations.password.field}${pageType === 'create' ? ' *' : ''}`}
            controller={control as unknown as Control<FieldValues>}
            validation={
              pageType === 'create' ? passwordValidation() : undefined
            }
          />
          <Input
            name="repeatPassword"
            type="password"
            label={`${strings.validations.repeatPassword.field}${pageType === 'create' ? ' *' : ''}`}
            controller={control as unknown as Control<FieldValues>}
            validation={
              pageType === 'create' ? passwordValidation() : undefined
            }
          />
        </Box>
      </Box>
      {permissionType === 'general' && (
        <Box>{/* TODO: Implementar CrudTable */}</Box>
      )}
      <FileUpload
        fileId={watch('imageId')}
        label={strings.common.profilePicture}
        onImageUpload={(fileId) => setValue('imageId', fileId)}
      />
    </Wrapper>
  );
};

export default Save;
