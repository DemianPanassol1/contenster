import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, useTheme, Link } from '@mui/material';
import { useForm, SubmitHandler, Control, FieldValues } from 'react-hook-form';

import {
  genericValidation,
  passwordValidation,
} from '@/utils/validations.util';
import routes from '@/routes';
import strings from '@/strings';
import { useNavigate } from '@/hooks/router.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { setHomePage, setSession } from '@/utils/functions.util';

import Image from '@/components/Image';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import Wrapper from '@/components/Wrapper';

interface FormFields {
  username: string;
  password: string;
  establishmentId: string;
  staySign: boolean;
}

const fields: FormFields = {
  username: '',
  password: '',
  establishmentId: '',
  staySign: false,
};

const Main: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, setValue, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const [selectCompany, setSelectCompany] = useState<Array<SelectOption>>([]);

  const { handleOnSubmit } = useGlobalContext();

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    const handleResponse = (response: Array<SelectOption> | Session) => {
      if (Array.isArray(response)) {
        const selectOptions = response;

        if (selectOptions.length > 1 && !content.establishmentId) {
          setSelectCompany(selectOptions);
        } else if (selectOptions.length === 1 && !content.establishmentId) {
          setValue('establishmentId', selectOptions[0].value);
          onSubmit({ ...content, establishmentId: selectOptions[0].value });
        }
      } else {
        const session = response;

        setSession(session);
        setHomePage({
          homePage: session?.homePage,
          redirect: !!session?.homePage,
        });

        navigate('/');
      }
    };

    if (!content.establishmentId) {
      handleOnSubmit({
        type: 'POST',
        body: content,
        endpoint: routes.CONTENSTER.GLOBAL.AUTHORIZE,
        message: false,
        onSuccess: (data) => handleResponse(data as Session),
      });
    } else {
      handleOnSubmit({
        type: 'POST',
        body: content,
        endpoint: routes.CONTENSTER.GLOBAL.SIGN_IN,
        message: strings.common.loggedSuccessfully,
        onSuccess: (data) => handleResponse(data as Array<SelectOption>),
        onError: () => {
          setSelectCompany([]);
          setValue('establishmentId', '');
        },
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '500px',
        display: 'flex',
        overflow: 'clip',
        maxWidth: '66rem',
        margin: '4rem auto 0',
        [theme.breakpoints.up('sm')]: {
          margin: '6rem auto 0',
        },
        [theme.breakpoints.up('md')]: {
          width: '85%',
        },
        [theme.breakpoints.up('lg')]: {
          width: '70%',
        },
      }}
    >
      <Image
        src="/assets/images/login_image.jpg"
        dimensions={{
          display: 'none',
          height: '100%',
          objectFit: 'cover',
          [theme.breakpoints.up('sm')]: {
            display: 'block',
            width: '40%',
          },
          [theme.breakpoints.up('lg')]: {
            width: '50%',
          },
        }}
      />
      <Wrapper
        submitButtonContent={strings.actions.loginButton}
        cancelButtonContent={strings.actions.cancel}
        onSubmit={handleSubmit(onSubmit)}
        customStyles={{
          position: 'relative',
          padding: '3rem 1rem',
          [theme.breakpoints.up('sm')]: {
            padding: '3rem',
          },
          [theme.breakpoints.up('lg')]: {
            padding: '3rem 4rem',
          },
        }}
        customSubmitButtonStyles={{ width: '100%', margin: '0' }}
      >
        <Image
          src="/assets/images/logo_image.png"
          dimensions={{
            height: '3.5rem',
            objectFit: 'contain',
          }}
        />
        <Box
          sx={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '1fr',
            margin: '1.5rem 0 0 0',
          }}
        >
          {!selectCompany.length ? (
            <>
              <Input
                name="username"
                label={strings.validations.username.field}
                controller={control as unknown as Control<FieldValues>}
                validation={genericValidation()}
              />
              <Input
                type="password"
                name="password"
                label={strings.validations.password.field}
                controller={control as unknown as Control<FieldValues>}
                validation={passwordValidation()}
              />
            </>
          ) : (
            <Select
              name="establishmentId"
              label={strings.validations.establishment.field}
              controller={control as unknown as Control<FieldValues>}
              fixedData={selectCompany}
              inputStyle={{ margin: '0 0 1.5rem' }}
              validation={genericValidation()}
            />
          )}
          <Switch
            name="staySign"
            label={strings.validations.staySignedIn.field}
            controller={control as unknown as Control<FieldValues>}
            inputStyle={{ marginTop: '-0.5rem' }}
          />
        </Box>
        <Link
          variant="caption"
          underline="hover"
          to="/auth/reset-password"
          component={RouterLink}
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: '1rem',
            transform: 'translateX(-50%)',
          }}
        >
          {strings.common.forgotPassword}
        </Link>
      </Wrapper>
    </Paper>
  );
};

export default Main;
