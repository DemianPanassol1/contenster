import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSessionStorage } from '@uidotdev/usehooks';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  GET_MODULES_LIST,
  GET_SYNC_USER,
  POST_CHANGE_USER_ESTABLISHMENT,
} from '../../../../../routes/contenster/global';
import { useGET, useNavigate } from '../../../../../utils/hooks.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { genericInputValidation } from '../../../../../utils/validations.util';
import { GET_ESTABLISHMENT_OPTIONS } from '../../../../../routes/contenster/options';

import Dialog from '../../../../../components/Dialog';
import Autocomplete from '../../../../../components/Autocomplete';

interface FormFields {
  establishmentId: string;
}

const fields: FormFields = {
  establishmentId: '',
};

const ChangeEstablishment: React.FC = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });
  const {
    toggleDialog,
    handleOnSubmit,
    state: { loading },
  } = useGlobalContext();

  const { t } = useTranslation(['common', 'validations']);

  const [session, setSession] = useSessionStorage<Session | null>('session', null);

  const navigate = useNavigate();
  const { refresh }: GetSyncUser = useGET(GET_SYNC_USER);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      url: POST_CHANGE_USER_ESTABLISHMENT,
      type: 'POST',
      body: content,
      message: false,
      onSuccess: async (response) => {
        setSession(response as Session);
        navigate('/');

        await refresh(this);
        refresh(GET_MODULES_LIST);

        toggleDialog();
      },
    });
  };

  return (
    <Dialog
      onClose={reset}
      loading={loading}
      content="establishment"
      dialogWidth="xs"
      onSubmit={handleSubmit(onSubmit)}
      title={t('common:changeEstablishment')}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '1.5rem 1rem',
          margin: '0 0 1rem',
          gridTemplateColumns: '1fr',
        }}
      >
        <Autocomplete
          name="establishmentId"
          label={t('validations:establishment.field')}
          urlData={GET_ESTABLISHMENT_OPTIONS}
          bodyContent={{
            userId: (session?.id ?? '').toString(),
          }}
          controller={control as unknown as Control<FieldValues>}
          validation={genericInputValidation(t)}
          helperText={errors.establishmentId?.message}
        />
      </Box>
    </Dialog>
  );
};

export default ChangeEstablishment;
