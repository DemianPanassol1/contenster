/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useGET, useNavigate } from '../../../../../utils/hooks.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';
import { genericInputValidation } from '../../../../../utils/validations.util';

import Input from '../../../../../components/Input';
import Wrapper from '../../../../../components/Wrapper';
import Translations from '../../../../../components/Translations';

export interface FormFields {
  id: string;
  position: string;
  establishmentId: string;
  titles: Record<string, unknown>[];
  descriptions: Record<string, unknown>[];
}

const fields: FormFields = {
  id: '',
  position: '',
  establishmentId: '',
  titles: [],
  descriptions: [],
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
  } = useForm<FormFields>({ defaultValues: fields });

  const theme = useTheme();
  const navigate = useNavigate();
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
          name="position"
          type="number"
          label={t('validations:position.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.position?.message}
          containerStyle={{ margin: '0' }}
        />

        <Translations
          title={t('validations:title.field')}
          field="titles"
          setValue={setValue}
          validationOnAll={false}
          validation={genericInputValidation(t)}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={t('validations:description.field')}
          field="descriptions"
          setValue={setValue}
          validationOnAll={false}
          validation={genericInputValidation(t)}
          controller={control as unknown as Control<FieldValues>}
        />
      </Box>
    </Wrapper>
  );
};

export default Save;
