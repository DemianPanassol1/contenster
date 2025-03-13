import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useSessionStorage } from '@uidotdev/usehooks';
import { Box, Paper, useTheme, Link } from '@mui/material';
import { useForm, SubmitHandler, Control, FieldValues } from 'react-hook-form';

import {
  genericInputValidation,
  passwordValidation,
} from '../../../../../utils/validations.util';
import { useGlobalContext } from '../../../../../contexts/global.context';
import { AUTHORIZE, SIGN_IN } from '../../../../../routes/contenster/global';

import Image from '../../../../../components/Image';
import Input from '../../../../../components/Input';
import Switch from '../../../../../components/Switch';
import Wrapper from '../../../../../components/Wrapper';
import Select from '../../../../../components/Select';

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
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });

  const { t } = useTranslation(['common', 'validations']);
  const [selectCompany, setSelectCompany] = useState<SelectOption[]>([]);

  // eslint-disable-next-line
  const [_, setSession] = useSessionStorage<Session | null>('session', null);
  // eslint-disable-next-line
  const [__, setHomePage] = useSessionStorage<HomePage | null>('homePage', null);

  const {
    state: { configInfo },
    handleOnSubmit,
  } = useGlobalContext();

  const onSubmit: SubmitHandler<FormFields> = (content) => {
     
    const handleResponse = (response: any) => {
      if (Array.isArray(response) && response.length > 1 && !content.establishmentId) {
        setSelectCompany(response);
      } else if (
        Array.isArray(response) &&
        response.length === 1 &&
        !content.establishmentId
      ) {
        Object.assign(content, {
          establishmentId: response.find((item) => item.value)?.value,
        });
        setTimeout(() => onSubmit(content), 500);
      } else {
        setTimeout(() => {
          setHomePage({
            redirect: !!response?.homePage,
            homePage: response?.homePage,
          });
          setSession(response);
        }, 500);
      }
    };

    if (!content.establishmentId) {
      handleOnSubmit({
        type: 'POST',
        url: AUTHORIZE,
        body: content,
        message: false,
        onSuccess(data) {
          handleResponse(data);
        },
      });
    } else {
      handleOnSubmit({
        type: 'POST',
        url: SIGN_IN,
        body: content,
        message: t('common:loggedSuccessfully'),
        onSuccess(data) {
          handleResponse(data);
        },
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
        src={configInfo?.loginBanner}
        title={t('common:signInBannerTitle')}
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
        submitButtonContent={t('common:loginButton')}
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
          src={configInfo?.loginLogo}
          title={t('common:signInLogoTitle')}
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
                label={t('validations:user.field')}
                controller={control as unknown as Control<FieldValues>}
                validation={genericInputValidation(t)}
                helperText={errors.username?.message}
              />
              <Input
                type="password"
                name="password"
                label={t('validations:password.field')}
                controller={control as unknown as Control<FieldValues>}
                validation={passwordValidation(t)}
                helperText={errors.password?.message}
              />
            </>
          ) : (
            <Select
              name="establishmentId"
              label={t('validations:establishment.field')}
              controller={control as unknown as Control<FieldValues>}
              fixedData={selectCompany}
              inputStyle={{ margin: '0 0 1.5rem' }}
              validation={genericInputValidation(t)}
            />
          )}
          <Switch
            name="staySign"
            label={t('validations:staySignedIn.field')}
            controller={control as unknown as Control<FieldValues>}
            helperText={errors.staySign?.message}
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
          {t('common:forgotPassword')}
        </Link>
      </Wrapper>
    </Paper>
  );
};

export default Main;
