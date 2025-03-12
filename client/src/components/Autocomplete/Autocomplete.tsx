import {
  Autocomplete as AutocompleteComponent,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

import { usePOST } from '../../utils/hooks.util';
import { buildReqFilter } from '../../utils/functions.util';

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
  inputStyle?: SxProps<Theme>;
  disabled?: boolean;
  helperText?: string | null;
  bodyContent?: Record<string, any>;
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
  bodyContent = {},
}) => {
  const theme = useTheme();

  const requestFilter = buildReqFilter({
    customFields: bodyContent,
  });

  const { data, refresh } = !fixedData.length
    ? usePOST(urlData, requestFilter)
    : { data: null, refresh: () => {} };

  const [fieldValue, setFieldValue] = useState<Option | null>(null);
  const [inputValue, setInputValue] = useState('');

  const options = [fixedData, data?.data].flat().filter(Boolean) as Option[];

  const populateField = () => {
    const [first, second] = name.split('.');

    let filteredOptions: Option | undefined;

    if (second) {
      filteredOptions = options.find(
        (i) => i.value.toString() === controller._formValues[first][second].toString()
      );
    } else {
      filteredOptions = options.find(
        (i) => i.value.toString() === controller._formValues[first].toString()
      );
    }

    setFieldValue(filteredOptions ?? null);
    setInputValue(filteredOptions?.label ?? '');
  };

  useEffect(() => {
    const timeout = setTimeout(populateField, fixedData.length ? 100 : 0);

    return () => clearTimeout(timeout);
  }, [data, fixedData]);

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
