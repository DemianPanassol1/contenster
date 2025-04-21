import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  emailValidation,
  genericValidation,
  phoneValidation,
} from '@/utils/validations.util';
import strings from '@/strings';
import { useGET } from '@/hooks/swr.hook';
import { useNavigate } from '@/hooks/router.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';

import Input from '@/components/Input';
import Switch from '@/components/Switch';
import Wrapper from '@/components/Wrapper';

export interface FormFields {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  content: string;
  read: boolean;
}

const fields: FormFields = {
  id: '',
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: '',
  read: false,
};

interface SaveProps {
  pageType: 'create' | 'edit';
  saveContentUrl: string;
  getContentUrl?: string | null;
}

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  getContentUrl = null,
}) => {
  const { control, setValue, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { data, isLoading, refresh } = useGET(getContentUrl ?? '');

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      endpoint: saveContentUrl,
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
        <Input
          readOnly
          name="name"
          label={strings.validations.name.field}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="email"
          label={strings.validations.email.field}
          controller={control as unknown as Control<FieldValues>}
          validation={emailValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="phone"
          label={strings.validations.phone.field}
          controller={control as unknown as Control<FieldValues>}
          mask="+## (##) #####-####"
          validation={phoneValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="subject"
          label={strings.validations.subject.field}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          multiline
          name="content"
          label={strings.validations.content.field}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0', gridColumn: '1 / -1' }}
        />
        <Switch
          name="read"
          label={strings.validations.read.field}
          controller={control as unknown as Control<FieldValues>}
          inputStyle={{ gridColumn: 1 }}
        />
      </Box>
    </Wrapper>
  );
};

export default Save;
