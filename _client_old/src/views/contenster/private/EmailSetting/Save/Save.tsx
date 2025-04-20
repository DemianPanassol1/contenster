import {
  Control,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import { GET_SYNC_USER } from '../../../../../routes/contenster/global';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';
import { genericInputValidation } from '../../../../../utils/validations.util';
import { GET_ESTABLISHMENT_OPTIONS } from '../../../../../routes/contenster/options';
import { useGET, useNavigate, useUserSession } from '../../../../../utils/hooks.util';

import Input from '../../../../../components/Input';
import Switch from '../../../../../components/Switch';
import Select from '../../../../../components/Select';
import Wrapper from '../../../../../components/Wrapper';
import Translations from '../../../../../components/Translations';

export interface FormFields {
  id: string;
  establishmentId: string;
  purpose: string;
  server: string;
  username: string;
  password: string;
  port: string;
  tls: boolean;
  ssl: boolean;
  sender: string;
  recipient: string;
  recipientCopy: string;
  titles: Record<string, unknown>[];
  subjects: Record<string, unknown>[];
  contents: Record<string, unknown>[];
  footers: Record<string, unknown>[];
}

const fields: FormFields = {
  id: '',
  establishmentId: '',
  purpose: '',
  server: '',
  port: '',
  username: '',
  password: '',
  tls: false,
  ssl: false,
  sender: '',
  recipient: '',
  recipientCopy: '',
  titles: [],
  subjects: [],
  contents: [],
  footers: [],
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

  const [i18nErrors, setI18nErrors] = useState<FieldErrors<FieldValues>[]>([]);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (i18nErrors.filter((obj) => Object.keys(obj).length > 0).length > 0) return;

    if (permissionType === 'establishment') {
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
          name="purpose"
          label={t('validations:purpose.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          inputStyle={{ margin: '0' }}
          fixedData={[
            { label: t('common:resetPassword'), value: 'reset-password' },
            { label: t('common:verifyEmail'), value: 'verify-email' },
            { label: t('common:contact'), value: 'contact' },
            { label: t('common:welcome'), value: 'welcome' },
          ]}
        />
        <Input
          name="server"
          label={t('validations:server.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.server?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 2,
            },
          }}
        />
        <Input
          name="port"
          type="number"
          label={t('validations:port.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.port?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 2,
              gridColumn: 2,
            },
          }}
        />
        <Input
          name="username"
          label={t('validations:username.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.username?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 3,
            },
          }}
        />
        <Input
          name="password"
          type="password"
          label={t('validations:password.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.password?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 3,
              gridColumn: 2,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
              gridColumn: 1,
            },
          }}
        >
          <Switch
            name="tls"
            label="TLS"
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.tls?.message}
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="ssl"
            label="SSL"
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.ssl?.message}
            inputStyle={{ height: '2.2rem' }}
          />
        </Box>

        <Input
          name="sender"
          label={t('validations:sender.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.sender?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 5,
            },
          }}
        />
        <Input
          name="recipient"
          label={t('validations:recipient.field')}
          controller={control as unknown as Control<FieldValues>}
          helperText={errors.recipient?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 5,
              gridColumn: 2,
            },
          }}
        />
        <Input
          name="recipientCopy"
          label={t('validations:recipientCopy.field')}
          controller={control as unknown as Control<FieldValues>}
          helperText={errors.recipientCopy?.message}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 5,
              gridColumn: 3,
            },
          }}
        />
        <Translations
          title={t('validations:title.field') + ' *'}
          field="titles"
          setValue={setValue}
          validationOnAll
          validation={genericInputValidation(t)}
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={t('validations:subject.field') + ' *'}
          field="subjects"
          setValue={setValue}
          validationOnAll
          setI18nErrors={setI18nErrors}
          validation={genericInputValidation(t)}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={t('validations:mainContent.field') + ' *'}
          field="contents"
          setValue={setValue}
          validationOnAll
          setI18nErrors={setI18nErrors}
          validation={genericInputValidation(t)}
          controller={control as unknown as Control<FieldValues>}
          inputStyle={{ gridColumn: '1 / -1' }}
          variant="textarea"
        />
        <Translations
          title={t('validations:footerContent.field')}
          field="footers"
          setValue={setValue}
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
          inputStyle={{ gridColumn: '1 / -1' }}
          variant="textarea"
        />
      </Box>
    </Wrapper>
  );
};

export default Save;
