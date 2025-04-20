import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';

import { useGET } from '@/hooks/swr.hook';
import { useSession } from '@/hooks/session.hook';
import { useNavigate } from '@/hooks/router.hook';
import { genericValidation } from '@/utils/validations.util';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';

import Switch from '@components/Switch';
import Select from '@components/Select';
import Wrapper from '@components/Wrapper';

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
  permissionType: Permission['type'];
  getContentUrl?: string | null;
}

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  permissionType,
  getContentUrl = null,
}) => {
  const { watch, control, setValue, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const theme = useTheme();
  const session = useSession();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { data, isLoading, refresh } = useGET(getContentUrl ?? '');

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (permissionType === 'establishment') {
      content.permissionType = 'establishment';
      content.establishmentId = session!.establishment.id.toString();
    }

    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      endpoint: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }

        refresh(routes.CONTENSTER.GLOBAL.GET_MODULES_LIST);
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
        {permissionType === 'general' && (
          <Select
            name="establishmentId"
            label={strings.validations.establishment.field + ' *'}
            controller={control as unknown as Control<FieldValues>}
            validation={genericValidation()}
            urlData={routes.CONTENSTER.OPTIONS.GET_ESTABLISHMENT_OPTIONS}
            inputStyle={{ margin: '0' }}
          />
        )}
        <Select
          name="roleId"
          label={strings.validations.role.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          urlData={routes.CONTENSTER.OPTIONS.GET_ROLE_OPTIONS}
          bodyContent={{
            establishmentIdRequired: true,
            establishmentId: watch('establishmentId'),
          }}
          inputStyle={{ margin: '0' }}
        />
        <Select
          name="functionalityId"
          label={strings.validations.functionality.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          urlData={routes.CONTENSTER.OPTIONS.GET_FUNCTIONALITY_OPTIONS}
          bodyContent={{
            establishmentIdRequired: true,
            establishmentId: watch('establishmentId'),
          }}
          inputStyle={{ margin: '0' }}
        />
        {permissionType === 'general' && (
          <Select
            name="permissionType"
            label={strings.validations.permissionType.field + ' *'}
            controller={control as unknown as Control<FieldValues>}
            validation={genericValidation()}
            fixedData={[
              { label: strings.common.general, value: 'general' },
              { label: strings.common.establishment, value: 'establishment' },
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
            {strings.common.permissions}
          </Typography>
          <Switch
            name="canRead"
            label={strings.validations.canRead.field}
            disabled
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="canCreate"
            label={strings.validations.canCreate.field}
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="canUpdate"
            label={strings.validations.canUpdate.field}
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="canDelete"
            label={strings.validations.canDelete.field}
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ height: '2.2rem' }}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Save;
