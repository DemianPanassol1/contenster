import {
  Box,
  Input,
  Theme,
  SxProps,
  useTheme,
  InputLabel,
  Typography,
  FormControl,
  InputAdornment,
} from '@mui/material';
import {
  Control,
  useForm,
  useWatch,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';
import React, { memo, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { PatternFormat } from 'react-number-format';

import config from '@config';

import Image from '@/components/Image';
import SectionTitle from '@/components/SectionTitle';

type TranslationsVariant = 'input' | 'textarea';
type TranslationsType = 'text' | 'password' | 'number';

interface StoredValue {
  id: number | null;
  text: string;
  language: {
    id: number;
    languageCode: LanguagesCode;
  };
}

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
  acceptedLanguages = [config.DEFAULT_LANGUAGE],
}) => {
  const theme = useTheme();

  const languages = (config.LANGUAGES ?? []).filter((lang) =>
    acceptedLanguages.includes(lang.code as LanguagesCode)
  );

  const storedValues: StoredValue[] = useWatch({
    control: controller,
    name: field,
  });

  const {
    control,
    trigger,
    clearErrors,
    formState: { errors },
    setValue: setFormValue,
  } = useForm({
    defaultValues: languages.reduce(
      (acc, elem: Language) => {
        const key = `${field}-${elem.code}`;
        acc[key] =
          storedValues.find(
            ({ language }: StoredValue) => language.id === elem.id
          )?.text ?? '';
        return acc;
      },
      {} as Record<string, string>
    ),
  });

  const values = useWatch({ control });

  const arraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1
      .slice()
      .sort()
      .every((value, index) => value === arr2.slice().sort()[index]);
  };

  useEffect(() => {
    const aux1 = Object.values(values) as string[];
    const aux2 = Object.values(
      storedValues.map((elem: StoredValue) => elem.text)
    );

    if (arraysEqual(aux1, aux2)) return;

    const fields = languages.map((elem: Language) => {
      const storedValue = storedValues.find(
        (stored: StoredValue) => stored.language.languageCode === elem.code
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

    storedValues.forEach((elem: StoredValue) => {
      const key = `${field}-${elem.language.languageCode}`;

      if (values[key] !== undefined) {
        setFormValue(key, elem.text, { shouldValidate: true });
      }
    });
  }, [storedValues]);

  useEffect(() => {
    setTimeout(() => {
      trigger();
    }, 150);
  }, []);

  useEffect(() => {
    setI18nErrors((prev) => [...prev, errors]);
  }, [errors]);

  const i18nEnabled = languages.length > 1;

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
                    {`${i18nEnabled ? item.name : title}${Object.keys(validation).some((v) => v === 'required') ? ' *' : ''}`}
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
