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
import { genericValidation } from '@/utils/validations.util';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';

import Select from '@/components/Select';
import Wrapper from '@/components/Wrapper';
import Translations from '@/components/Translations';

export interface FormFields {
  id: string;
  establishmentId: string;
  titles: Record<string, unknown>[];
  descriptions: Record<string, unknown>[];
}

const fields: FormFields = {
  id: '',
  establishmentId: '',
  titles: [],
  descriptions: [],
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
        <Translations
          title={strings.validations.title.field}
          field="titles"
          setValue={setValue}
          validation={genericValidation()}
          setI18nErrors={setI18nErrors}
          controller={control as unknown as Control<FieldValues>}
        />
        <Translations
          title={strings.validations.description.field}
          field="descriptions"
          setValue={setValue}
          setI18nErrors={setI18nErrors}
          validation={genericValidation()}
          controller={control as unknown as Control<FieldValues>}
        />
      </Box>
    </Wrapper>
  );
};

export default Save;
