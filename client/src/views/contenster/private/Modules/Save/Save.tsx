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

import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';
import { genericInputValidation } from '../../../../../utils/validations.util';
import { GET_ESTABLISHMENT_OPTIONS } from '../../../../../routes/contenster/options';
import { useGET, useNavigate, useUserSession } from '../../../../../utils/hooks.util';
import { GET_MODULES_LIST, GET_SYNC_USER } from '../../../../../routes/contenster/global';

import Input from '../../../../../components/Input';
import Wrapper from '../../../../../components/Wrapper';
import Translations from '../../../../../components/Translations';
import Autocomplete from '../../../../../components/Autocomplete';

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
          <Autocomplete
            name="establishmentId"
            label={t('validations:establishment.field') + ' *'}
            controller={control as unknown as Control<FieldValues>}
            validation={genericInputValidation(t)}
            urlData={GET_ESTABLISHMENT_OPTIONS}
            bodyContent={{}}
            helperText={errors.establishmentId?.message}
            inputStyle={{ margin: '0' }}
          />
        )}
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
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={t('validations:description.field')}
          field="descriptions"
          setValue={setValue}
          validationOnAll
          setI18nErrors={setI18nErrors}
          validation={genericInputValidation(t)}
          controller={control as unknown as Control<FieldValues>}
        />
      </Box>
    </Wrapper>
  );
};

export default Save;
