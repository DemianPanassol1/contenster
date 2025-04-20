import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  emailValidation,
  genericInputValidation,
} from '../../../../../utils/validations.util';
import { useGET, useNavigate } from '../../../../../utils/hooks.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';

import Input from '../../../../../components/Input';
import Switch from '../../../../../components/Switch';
import Wrapper from '../../../../../components/Wrapper';

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
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: fields,
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { t } = useTranslation(['common', 'validations']);
  const { data, isLoading, refresh } = useGET(getContentUrl as string);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
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
          readOnly
          name="name"
          label={t('validations:name.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.name?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="email"
          label={t('validations:email.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={emailValidation(t)}
          helperText={errors.email?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="phone"
          label={t('validations:phone.field')}
          controller={control as unknown as Control<FieldValues>}
          mask="+## (##) #####-####"
          validation={genericInputValidation(t)}
          helperText={errors.phone?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="subject"
          label={t('validations:subject.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.subject?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          readOnly
          name="content"
          label={t('validations:content.field')}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.content?.message}
          containerStyle={{ margin: '0' }}
        />
        <Switch
          name="read"
          label={t('validations:read.field')}
          controller={control as unknown as Control<FieldValues>}
          helperText={errors.read?.message}
          inputStyle={{ gridColumn: 1 }}
        />
      </Box>
    </Wrapper>
  );
};

export default Save;
