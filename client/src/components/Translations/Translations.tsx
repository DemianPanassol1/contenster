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
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import { PatternFormat } from 'react-number-format';
import React, { memo, useEffect, useMemo, useState } from 'react';

import { generateUniqueId } from '../../utils/functions.util';
import { useGlobalContext } from '../../contexts/global.context';

import Image from '../Image';
import SectionTitle from '../SectionTitle';

interface TranslationsProps {
  field: string;
  helperText?: string | null;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  controller: Control<FieldValues>;
  title?: string;
  inputStyle?: SxProps<Theme>;
  containerStyle?: SxProps<Theme>;
  type?: 'text' | 'password' | 'number';
  mask?: string;
  allFieldsRequired?: boolean;
}

interface TranslationValues {
  lang: string;
  id: number | null;
  tempId: string;
  text: string | null;
  icon: string;
  label: string;
  required: boolean;
  languageId: number;
}

const Translations: React.FC<TranslationsProps> = ({
  field,
  setValue,
  controller,
  clearErrors,
  mask = '',
  title = null,
  type = 'text',
  helperText = null,
  inputStyle = {},
  containerStyle = {},
  allFieldsRequired = false,
}) => {
  const {
    state: { configInfo },
  } = useGlobalContext();
  const theme = useTheme();
  const watchedValues = useWatch({ control: controller, name: field });

  const initialValues = useMemo(() => {
    const fields = (configInfo?.languages ?? []).filter(
      (lang) => lang.purpose === 'both' || lang.purpose === 'console'
    );

    return fields.map((lang) => ({
      id: null,
      text: null,
      lang: lang.code,
      icon: lang.icon,
      label: lang.name,
      languageId: lang.id,
      required: lang.default,
      tempId: generateUniqueId(),
    }));
  }, [configInfo]);

  const [values, setValues] = useState<TranslationValues[]>(initialValues);

  const debouncedValues = useDebounce(values, 500);

  function handleOnChangeField(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setValues((prevValues) =>
      prevValues.map((item) =>
        item.tempId === name && item.text !== value ? { ...item, text: value } : item
      )
    );
  }

  useEffect(() => {
    if (JSON.stringify(watchedValues) !== JSON.stringify(values)) {
      const auxArray = values.map((item) => {
        const match = watchedValues?.find(
          (value: any) =>
            (value?.language?.id ?? '').toString() === item.languageId.toString()
        );

        return {
          ...item,
          id: match?.id ?? null,
          text: match?.text ?? null,
        };
      });

      setValues(auxArray);
    }
  }, [watchedValues]);

  useEffect(() => {
    clearErrors(field);
    setValue(field, debouncedValues, { shouldValidate: true });
  }, [debouncedValues]);

  const i18nEnabled = values.length > 1;

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
            margin: '0.75rem 0 2rem',
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
        {values.map((item: TranslationValues) => (
          <FormControl
            key={item.tempId}
            variant="standard"
            sx={{
              display: 'flex',
              width: '100%',
              ...inputStyle,
            }}
          >
            <InputLabel
              shrink={!!item.text}
              htmlFor={item.tempId}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {`${i18nEnabled ? item.label : title}${item.required || allFieldsRequired ? ' *' : ''}`}
            </InputLabel>
            {mask && type !== 'number' ? (
              <PatternFormat
                type={type}
                size="small"
                format={mask}
                id={item.tempId}
                lang={item.lang}
                value={item.text}
                name={item.tempId}
                customInput={Input}
                sx={{ width: '100%' }}
                required={item.required}
                onChange={handleOnChangeField}
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
                type={type}
                id={item.tempId}
                lang={item.lang}
                value={item.text}
                name={item.tempId}
                required={item.required}
                onChange={handleOnChangeField}
                sx={{ width: '100%' }}
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
            {(item.required || allFieldsRequired) && !item.text && (
              <Typography
                sx={{ color: theme.palette.error.main }}
                variant="caption"
              >
                {helperText}
              </Typography>
            )}
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default memo(Translations);
