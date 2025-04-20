import {
  Control,
  useForm,
  FieldErrors,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import routes from '@/routes';
import strings from '@/strings';
import { useGET } from '@/hooks/swr.hook';
import { useNavigate } from '@/hooks/router.hook';
import { useSession } from '@/hooks/session.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { genericValidation } from '@/utils/validations.util';
import { handlePopulateFields } from '@/utils/functions.util';

import Input from '@/components/Input';
import Switch from '@/components/Switch';
import Select from '@/components/Select';
import Wrapper from '@/components/Wrapper';
import Translations from '@/components/Translations';

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
  const { control, setValue, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const theme = useTheme();
  const session = useSession();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { data, isLoading, refresh } = useGET(getContentUrl ?? '');

  const [i18nErrors, setI18nErrors] = useState<FieldErrors<FieldValues>[]>([]);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (i18nErrors.filter((obj) => Object.keys(obj).length > 0).length > 0)
      return;

    if (permissionType === 'establishment') {
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
          name="purpose"
          label={strings.validations.purpose.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          inputStyle={{ margin: '0' }}
          fixedData={[
            { label: strings.common.resetPassword, value: 'reset-password' },
            { label: strings.common.verifyEmail, value: 'verify-email' },
            { label: strings.common.contact, value: 'contact' },
            { label: strings.common.welcome, value: 'welcome' },
          ]}
        />
        <Input
          name="server"
          label={strings.validations.server.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
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
          label={strings.validations.port.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
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
          label={strings.validations.username.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
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
          label={strings.validations.password.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
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
            inputStyle={{ height: '2.2rem' }}
          />
          <Switch
            name="ssl"
            label="SSL"
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ height: '2.2rem' }}
          />
        </Box>
        <Input
          name="sender"
          label={strings.validations.sender.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 5,
            },
          }}
        />
        <Input
          name="recipient"
          label={strings.validations.recipient.field}
          controller={control as unknown as Control<FieldValues>}
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
          label={strings.validations.recipientCopy.field}
          controller={control as unknown as Control<FieldValues>}
          containerStyle={{
            margin: '0',
            [theme.breakpoints.up('sm')]: {
              gridRow: 5,
              gridColumn: 3,
            },
          }}
        />
        <Translations
          title={strings.validations.title.field + ' *'}
          field="titles"
          setValue={setValue}
          validation={genericValidation()}
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={strings.validations.subject.field + ' *'}
          field="subjects"
          setValue={setValue}
          setI18nErrors={setI18nErrors}
          validation={genericValidation()}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={strings.validations.mainContent.field + ' *'}
          field="contents"
          setValue={setValue}
          setI18nErrors={setI18nErrors}
          validation={genericValidation()}
          controller={control as unknown as Control<FieldValues>}
          inputStyle={{ gridColumn: '1 / -1' }}
          variant="textarea"
        />
        <Translations
          title={strings.validations.footerContent.field}
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
