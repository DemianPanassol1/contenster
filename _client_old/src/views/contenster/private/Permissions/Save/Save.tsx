import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  GET_ROLE_OPTIONS,
  GET_ESTABLISHMENT_OPTIONS,
  GET_FUNCTIONALITY_OPTIONS,
} from '../../../../../routes/contenster/options';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';
import { genericInputValidation } from '../../../../../utils/validations.util';
import { useGET, useNavigate, useUserSession } from '../../../../../utils/hooks.util';
import { GET_MODULES_LIST, GET_SYNC_USER } from '../../../../../routes/contenster/global';

import Switch from '../../../../../components/Switch';
import Select from '../../../../../components/Select';
import Wrapper from '../../../../../components/Wrapper';

interface FormFields {
  id: string;
  establishmentId: string;
  roleId: string;
  functionalityId: string;
  permissionType: Permission['type'];
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

const fields: FormFields = {
  id: '',
  establishmentId: '',
  roleId: '',
  functionalityId: '',
  permissionType: 'establishment',
  canRead: true,
  canCreate: false,
  canUpdate: false,
  canDelete: false,
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
  permissionType,
  getContentUrl = null,
}) => {
  const {
    watch,
    control,
    setValue,
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
    if (permissionType === 'establishment') {
      content.permissionType = 'establishment';
      content.establishmentId = session?.establishment.id.toString() ?? '';
    }

    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      url: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }

        refresh(GET_MODULES_LIST);
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
        {permissionType === 'general' && (
          <Select
            name="establishmentId"
            label={t('validations:establishment.field') + ' *'}
            controller={control as unknown as Control<FieldValues>}
            validation={genericInputValidation(t)}
            urlData={GET_ESTABLISHMENT_OPTIONS}
            bodyContent={{}}
            inputStyle={{ margin: '0' }}
          />
        )}
        <Select
          name="roleId"
          label={t('validations:role.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          urlData={GET_ROLE_OPTIONS}
          bodyContent={{
            establishmentIdRequired: true,
            establishmentId: watch('establishmentId'),
          }}
          inputStyle={{ margin: '0' }}
        />
        <Select
          name="functionalityId"
          label={t('validations:functionality.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          urlData={GET_FUNCTIONALITY_OPTIONS}
          bodyContent={{
            establishmentIdRequired: true,
            establishmentId: watch('establishmentId'),
          }}
          inputStyle={{ margin: '0' }}
        />
        {permissionType === 'general' && (
          <Select
            name="permissionType"
            label={t('validations:permissionType.field') + ' *'}
            controller={control as unknown as Control<FieldValues>}
            validation={genericInputValidation(t)}
            fixedData={[
              { label: t('common:general'), value: 'general' },
              { label: t('common:establishment'), value: 'establishment' },
            ]}
            inputStyle={{ margin: '0' }}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
              gridColumn: 1,
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{ margin: '0 0 0.5rem' }}
          >
            {t('common:permissions')}
          </Typography>
          <Switch
            name="canRead"
            label={t('validations:canRead.field')}
            disabled
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.canRead?.message}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="canCreate"
            label={t('validations:canCreate.field')}
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.canCreate?.message}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="canUpdate"
            label={t('validations:canUpdate.field')}
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.canUpdate?.message}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="canDelete"
            label={t('validations:canDelete.field')}
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.canDelete?.message}
            inputStyle={{ height: '2.2rem' }}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Save;
