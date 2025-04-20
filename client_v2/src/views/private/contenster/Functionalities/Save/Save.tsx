import {
  Control,
  useForm,
  FieldErrors,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography, useTheme } from '@mui/material';

import routes from '@/routes';
import strings from '@/strings';

import { useGET } from '@/hooks/swr.hook';
import { useToast } from '@/hooks/toast.hook';
import { useNavigate } from '@/hooks/router.hook';
import { useSession } from '@/hooks/session.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { genericValidation } from '@/utils/validations.util';
import { handlePopulateFields } from '@/utils/functions.util';

import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Wrapper from '@/components/Wrapper';
import IconPicker from '@/components/IconPicker';
import Translations from '@/components/Translations';

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
  permissionType: Permission['type'];
  getContentUrl?: string | null;
}

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  permissionType,
  getContentUrl = null,
}) => {
  const { watch, control, getValues, setValue, handleSubmit } =
    useForm<FormFields>({
      defaultValues: fields,
    });

  const theme = useTheme();
  const session = useSession();
  const navigate = useNavigate();
  const { errorMessage } = useToast();
  const [icon, setIcon] = useState<string>('');
  const { handleOnSubmit } = useGlobalContext();
  const { data, isLoading, refresh } = useGET(getContentUrl ?? '');

  const [i18nErrors, setI18nErrors] = useState<FieldErrors<FieldValues>[]>([]);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    if (i18nErrors.filter((obj) => Object.keys(obj).length > 0).length > 0)
      return;

    if (content.icon === '') {
      errorMessage(strings.validations.icon.required);
      return;
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
      setIcon(getValues('icon'));
    }

    if (permissionType === 'establishment') {
      setValue('establishmentId', session!.establishment.id.toString());
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
        <Translations
          title={strings.validations.title.field}
          field="titles"
          setValue={setValue}
          validation={genericValidation()}
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="slug"
          label={strings.validations.slug.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="position"
          type="number"
          label={strings.validations.position.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
        />
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
          name="moduleId"
          label={strings.validations.module.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
          urlData={routes.CONTENSTER.OPTIONS.GET_MODULE_OPTIONS}
          bodyContent={{
            establishmentIdRequired: true,
            establishmentId: watch('establishmentId'),
          }}
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
            <Typography variant="body1">
              {strings.common.selectedIcon}
            </Typography>
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
