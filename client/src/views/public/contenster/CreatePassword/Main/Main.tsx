import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Paper, useTheme, Link, Typography } from '@mui/material';
import { useForm, SubmitHandler, Control, FieldValues } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';
import { useNavigate } from '@/hooks/router.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { passwordValidation } from '@/utils/validations.util';

import Image from '@/components/Image';
import Input from '@/components/Input';
import Wrapper from '@/components/Wrapper';

interface FormFields {
  password: string;
  repeatPassword: string;
}

const fields: FormFields = {
  password: '',
  repeatPassword: '',
};

const Main: React.FC = () => {
  const theme = useTheme();
  const { token } = useParams();
  const navigate = useNavigate();
  const { control, setError, handleSubmit } = useForm<FormFields>({
    defaultValues: fields,
  });

  const { handleOnSubmit } = useGlobalContext();

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    const body = { ...content, token };

    if (content.password !== content.repeatPassword) {
      setError('repeatPassword', {
        type: 'value',
        message: strings.validations.repeatPassword.mustMatch,
      });
      return;
    }

    handleOnSubmit({
      endpoint: routes.CONTENSTER.GLOBAL.POST_CREATE_PASSWORD,
      type: 'POST',
      body: body,
      message: strings.common.passwordResetSuccess,
      onSuccess: () => setTimeout(() => navigate('/auth/sign-in'), 500),
    });
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
      <Wrapper
        variant="opacity"
        submitButtonContent={strings.common.createPasswordButton}
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
        customSubmitButtonStyles={{ width: '100%', margin: '-1rem 0 0' }}
      >
        <Image
          src="/assets/images/logo_image.png"
          dimensions={{
            height: '3.5rem',
            objectFit: 'contain',
          }}
        />
        <Box>
          <Typography
            variant="caption"
            sx={{ textAlign: 'center', display: 'block', margin: '1.5rem 0 0' }}
          >
            {strings.common.createPasswordText('5')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '1fr',
            margin: '0.5rem 0 0',
          }}
        >
          <Input
            name="password"
            type="password"
            label={strings.validations.password.field}
            controller={control as unknown as Control<FieldValues>}
            validation={passwordValidation()}
          />
          <Input
            name="repeatPassword"
            type="password"
            label={strings.validations.repeatPassword.field}
            controller={control as unknown as Control<FieldValues>}
            validation={passwordValidation()}
          />
        </Box>
        <Link
          variant="caption"
          underline="hover"
          to="/auth/sign-in"
          component={RouterLink}
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: '1rem',
            transform: 'translateX(-50%)',
          }}
        >
          {strings.actions.goBack}
        </Link>
      </Wrapper>
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
    </Paper>
  );
};

export default Main;
