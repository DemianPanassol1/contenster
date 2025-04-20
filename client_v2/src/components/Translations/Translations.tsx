import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import { PatternFormat } from 'react-number-format';
import React, { memo, useCallback, useEffect } from 'react';

import config from '@config';

import Image from '@/components/Image';
import SectionTitle from '@/components/SectionTitle';

type TranslationsVariant = 'input' | 'textarea';
type TranslationsType = 'text' | 'password' | 'number';

interface TranslationsProps {
  field: string;
  setValue: UseFormSetValue<any>; // eslint-disable-line
  controller: Control<FieldValues>;
  mask?: string;
  title?: string;
  inputStyle?: SxProps<Theme>;
  containerStyle?: SxProps<Theme>;
  type?: TranslationsType;
  variant?: TranslationsVariant;
  validation?: Record<string, unknown>;
  setI18nErrors: React.Dispatch<
    React.SetStateAction<FieldErrors<FieldValues>[]>
  >;
  acceptedLanguages?: Array<LanguagesCode>;
}

const Translations: React.FC<TranslationsProps> = ({
  field,
  setValue,
  controller,
  setI18nErrors,
  mask = '',
  title = null,
  type = 'text',
  variant = 'input',
  inputStyle = {},
  validation = {},
  containerStyle = {},
  acceptedLanguages = ['pt'],
}) => {
  const theme = useTheme();

  const {
    control,
    trigger,
    clearErrors,
    formState: { errors },
    setValue: setFormValue,
  } = useForm();

  const values = useWatch({ control });
  const storedValues = useWatch({ control: controller, name: field });

  const arraysEqual = useCallback((arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1
      .slice()
      .sort()
      .every((value, index) => value === arr2.slice().sort()[index]);
  }, []);

  const languages = (config.LANGUAGES ?? []).filter((lang) =>
    acceptedLanguages.includes(lang.code as LanguagesCode)
  );

  const i18nEnabled = languages.length > 1;

  useEffect(() => {
    const aux1 = Object.values(values);
    const aux2 = Object.values(
      storedValues.map((elem: { text: string }) => elem.text)
    ) as string[];

    if (arraysEqual(aux1, aux2)) return;

    const fields = languages.map((elem: Language) => {
      const storedValue = storedValues.find(
        (stored: { language: { languageCode: string } }) =>
          stored.language.languageCode === elem.code
      );

      if (storedValue) {
        return {
          ...storedValue,
          text: values[`${field}-${storedValue.language.languageCode}`] ?? '',
        };
      }

      return {
        id: null,
        text: values[`${field}-${elem.code}`] ?? '',
        language: {
          id: elem.id,
          languageCode: elem.code,
        },
      };
    });

    setValue(field, fields);
  }, [useDebounce(values, 250)]);

  useEffect(() => {
    if (!storedValues.length) return;

    storedValues.forEach(
      (elem: { text: string; language: { languageCode: string } }) => {
        setFormValue(`${field}-${elem.language.languageCode}`, elem.text, {
          shouldValidate: true,
        });
      }
    );
  }, [storedValues]);

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    setI18nErrors((prev) => [...prev, errors]);
  }, [errors]);

  return (
    <Box
      sx={{
        ...(i18nEnabled && {
          gridColumn: '1 / -1',
        }),
        ...(!i18nEnabled && {
          display: 'flex',
          marginTop: mask ? '-1px' : '-3px',
        }),
        ...containerStyle,
      }}
    >
      {title && i18nEnabled && (
        <SectionTitle
          title={title}
          variant="body1"
        />
      )}

      <Box
        sx={{
          ...(!i18nEnabled && {
            flex: 1,
          }),
          ...(i18nEnabled && {
            display: 'grid',
            gap: '1.5rem 2rem',
            margin: '0.75rem 0 0',
            gridTemplateColumns: '1fr',
            [theme.breakpoints.up('md')]: {
              gridTemplateColumns: '1fr 1fr',
            },
            [theme.breakpoints.up('lg')]: {
              gridTemplateColumns: '1fr 1fr 1fr',
            },
          }),
        }}
      >
        {languages.map((item: Language) => (
          <Controller
            rules={validation}
            key={`${field}-${item.code}`}
            name={`${field}-${item.code}`}
            control={control}
            render={({ field }) => {
              const message = errors[field.name]?.message ?? '';

              return (
                <FormControl
                  variant="standard"
                  sx={{
                    display: 'flex',
                    width: '100%',
                    ...inputStyle,
                  }}
                >
                  <InputLabel
                    shrink={!!field.value}
                    htmlFor={field.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {`${i18nEnabled ? item.name : title}${Object.keys(validation).length ? ' *' : ''}`}
                  </InputLabel>

                  {mask && type !== 'number' ? (
                    <PatternFormat
                      type={type}
                      size="small"
                      format={mask}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      autoComplete={field.name}
                      onChange={(event) => {
                        field.onChange(event);
                        clearErrors(field.name);
                      }}
                      id={`input-${field.name}`}
                      customInput={Input}
                      sx={{ ...inputStyle }}
                      endAdornment={
                        i18nEnabled && (
                          <InputAdornment position="end">
                            <Image
                              src={item.icon}
                              variant="rectangular"
                              dimensions={{ width: '1.5rem', height: 'auto' }}
                            />
                          </InputAdornment>
                        )
                      }
                    />
                  ) : (
                    <Input
                      {...field}
                      multiline={variant === 'textarea'}
                      rows={variant === 'textarea' ? 4 : undefined}
                      id={field.name}
                      value={field.value ?? ''}
                      onChange={(event) => {
                        field.onChange(event);
                        clearErrors(field.name);
                      }}
                      type={type}
                      sx={{
                        width: '100%',
                        ...(variant === 'textarea' && {
                          alignItems: 'flex-start',
                        }),
                      }}
                      endAdornment={
                        i18nEnabled && (
                          <InputAdornment position="end">
                            <Image
                              src={item.icon}
                              variant="rectangular"
                              dimensions={{ width: '1.5rem', height: 'auto' }}
                            />
                          </InputAdornment>
                        )
                      }
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.error.main }}
                  >
                    {message as string}
                  </Typography>
                </FormControl>
              );
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default memo(Translations);
