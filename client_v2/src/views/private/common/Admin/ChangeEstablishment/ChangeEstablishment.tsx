import React from 'react';
import { Box } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';

import { useGET } from '@/hooks/swr.hook';
import { useNavigate } from '@/hooks/router.hook';
import { useSession } from '@/hooks/session.hook';
import { setSession } from '@/utils/functions.util';
import { genericValidation } from '@/utils/validations.util';
import { useGlobalContext } from '@/contexts/global.context';

import Dialog from '@/components/Dialog';
import Select from '@/components/Select';

interface FormFields {
  establishmentId: string;
}

const fields: FormFields = {
  establishmentId: '',
};

const ChangeEstablishment: React.FC = () => {
  const {
    toggleDialog,
    handleOnSubmit,
    state: { loading },
  } = useGlobalContext();
  const { reset, control, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const session = useSession();

  const navigate = useNavigate();
  const { refresh } = useGET<Session>(routes.CONTENSTER.GLOBAL.GET_SYNC_USER);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      type: 'POST',
      endpoint: routes.CONTENSTER.GLOBAL.POST_CHANGE_USER_ESTABLISHMENT,
      body: content,
      message: false,
      onSuccess: async (response) => {
        setSession(response as Session);
        navigate('/');

        await refresh(this);

        refresh(routes.CONTENSTER.GLOBAL.GET_MODULES_LIST);

        toggleDialog(null);
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
      title={strings.actions.changeEstablishment}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '1.5rem 1rem',
          margin: '0 0 1rem',
          gridTemplateColumns: '1fr',
        }}
      >
        <Select
          name="establishmentId"
          label={strings.validations.establishment.field}
          urlData={routes.CONTENSTER.OPTIONS.GET_ESTABLISHMENT_OPTIONS}
          bodyContent={{
            userId: (session?.id ?? '').toString(),
          }}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation()}
        />
      </Box>
    </Dialog>
  );
};

export default ChangeEstablishment;
