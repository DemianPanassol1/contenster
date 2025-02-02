import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, useTheme, Link, Typography } from '@mui/material';
import { useForm, SubmitHandler, Control, FieldValues } from 'react-hook-form';

import { emailValidation } from '../../../../../utils/validations.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { POST_RESET_PASSWORD } from '../../../../../routes/contenster/global';

import Image from '../../../../../components/Image';
import Input from '../../../../../components/Input';
import Wrapper from '../../../../../components/Wrapper';

interface FormFields {
  email: string;
}

const fields: FormFields = {
  email: '',
};

const Main: React.FC = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });

  const { t } = useTranslation(['common', 'validations']);

  const {
    state: { configInfo },
    handleOnSubmit,
  } = useGlobalContext();

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      url: POST_RESET_PASSWORD,
      type: 'POST',
      body: content,
      message: 'Email enviado com sucesso',
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
        submitButtonContent="Recuperar senha"
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
          src={configInfo?.loginLogo}
          title={t('common:signInLogoTitle')}
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
            {t('common:resetPasswordText')}
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
            name="email"
            label={t('validations:email.field')}
            controller={control as unknown as Control<FieldValues>}
            validation={emailValidation(t)}
            helperText={errors.email?.message}
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
          Voltar
        </Link>
      </Wrapper>
      <Image
        src={configInfo?.loginBanner}
        title={t('common:resetPasswordBannerTitle')}
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
