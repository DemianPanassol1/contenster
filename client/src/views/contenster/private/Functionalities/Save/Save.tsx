/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Control,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography, useTheme } from '@mui/material';

import {
  useGET,
  useNavigate,
  useToast,
  useUserSession,
} from '../../../../../utils/hooks.util';
import {
  GET_ESTABLISHMENT_OPTIONS,
  GET_MODULE_OPTIONS,
} from '../../../../../routes/contenster/options';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { handlePopulateFields } from '../../../../../utils/functions.util';
import { genericInputValidation } from '../../../../../utils/validations.util';
import { GET_MODULES_LIST, GET_SYNC_USER } from '../../../../../routes/contenster/global';

import Icon from '../../../../../components/Icon';
import Input from '../../../../../components/Input';
import Wrapper from '../../../../../components/Wrapper';
import IconPicker from '../../../../../components/IconPicker';
import Translations from '../../../../../components/Translations';
import Autocomplete from '../../../../../components/Autocomplete';

export interface FormFields {
  id: string;
  slug: string;
  icon: string;
  position: string;
  moduleId: string;
  establishmentId: string;
  titles: Record<string, unknown>[];
}

const fields: FormFields = {
  id: '',
  slug: '',
  icon: '',
  position: '',
  moduleId: '',
  establishmentId: '',
  titles: [],
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
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: fields,
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const session = useUserSession();
  const { errorMessage } = useToast();
  const { handleOnSubmit } = useGlobalContext();
  const { t } = useTranslation(['common', 'validations']);
  const { data, isLoading, refresh } = useGET(getContentUrl as string);

  const [i18nErrors, setI18nErrors] = useState<FieldErrors<FieldValues>[]>([]);

  const [icon, setIcon] = useState<string>('');

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (i18nErrors.filter((obj) => Object.keys(obj).length > 0).length > 0) return;

    if (content.icon === '') {
      errorMessage(t('validations:icon.required'));
      return;
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
      setIcon(getValues('icon'));
    }

    if (permissionType === 'establishment') {
      setValue('establishmentId', (session?.establishment.id ?? '').toString());
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (icon) setValue('icon', icon);
  }, [icon]);

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
        <Translations
          title={t('validations:title.field')}
          field="titles"
          setValue={setValue}
          validationOnAll
          validation={genericInputValidation(t)}
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="slug"
          label={t('validations:slug.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.slug?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="position"
          type="number"
          label={t('validations:position.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.position?.message}
          containerStyle={{ margin: '0' }}
        />
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
        <Autocomplete
          name="moduleId"
          label={t('validations:module.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          urlData={GET_MODULE_OPTIONS}
          bodyContent={{
            establishmentId: watch('establishmentId'),
            establishmentIdRequired: true,
          }}
          helperText={errors.moduleId?.message}
          inputStyle={{ margin: '0' }}
        />
        <Box
          sx={{
            [theme.breakpoints.up('sm')]: {
              gridColumn: 1,
              gridRow: 4,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              stroke: 'black',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">{t('common:selectedIcon')}</Typography>
            <Chip
              clickable
              icon={<Icon icon={icon} />}
              label={icon.split('/').slice(-1).join('/')}
              sx={{
                padding: '0 0.3rem',
                margin: '0 0 0 0.75rem',
              }}
            />
          </Box>
          <IconPicker
            selectedIcon={icon}
            setIconValue={(icon: string) => setIcon(icon)}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Save;
