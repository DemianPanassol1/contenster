import {
  Autocomplete as AutocompleteComponent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

import { useGET } from '../../utils/hooks.util';

interface Option {
  label: string;
  value: string;
}

interface AutocompleteProps {
  name: string;
  label: string;
  controller: Control<FieldValues>;
  urlData?: string;
  fixedData?: Option[];
  validation?: Record<string, unknown>;
  inputStyle?: React.CSSProperties;
  disabled?: boolean;
  helperText?: string | null;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  label,
  controller,
  urlData = '',
  fixedData = [],
  validation = {},
  inputStyle = {},
  disabled = false,
  helperText = null,
}) => {
  const theme = useTheme();
  const { data, refresh } = useGET(urlData);

  const [fieldValue, setFieldValue] = useState<Option | null>(null);
  const [inputValue, setInputValue] = useState('');

  const options = [fixedData, data].flat().filter(Boolean) as Option[];

  const populateField = () => {
    const [first, second] = name.split('.');

    let filteredOptions: Option | undefined;

    if (second) {
      filteredOptions = options.find(
        (i) => i.value === controller._formValues[first][second]
      );
    } else {
      filteredOptions = options.find((i) => i.value === controller._formValues[first]);
    }

    setFieldValue(filteredOptions ?? null);
    setInputValue(filteredOptions?.label ?? '');
  };

  useEffect(() => {
    const time = fixedData.length ? 100 : 0;
    const timeout = setTimeout(() => populateField(), time);

    data && timeout;

    return () => clearTimeout(timeout);
  }, [data]);

  useEffect(() => {
    refresh(urlData);
  }, [urlData]);

  console.warn = () => {};

  return (
    <Controller
      name={name}
      rules={validation}
      control={controller}
      render={({ field: { onBlur, onChange, ref } }) => {
        return (
          <AutocompleteComponent
            ref={ref}
            onBlur={onBlur}
            sx={inputStyle}
            disabled={disabled}
            options={options}
            value={fieldValue}
            inputValue={inputValue}
            autoComplete={false}
            id={`autocomplete-${name}`}
            disableClearable={options.length === 1}
            isOptionEqualToValue={(o, v) => o.value === v.value}
            onChange={(_, newValue) => {
              const value = parseInt(newValue?.value ?? '', 10);
              onChange(Number.isNaN(value) ? '' : value);
              setFieldValue(newValue);
            }}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                label={label}
                variant="standard"
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.error.main,
                    }}
                  >
                    {helperText}
                  </Typography>
                }
              />
            )}
          />
        );
      }}
    />
  );
};

export default Autocomplete;
