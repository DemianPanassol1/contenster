import {
  Theme,
  SxProps,
  useTheme,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { usePOST } from '@/hooks/swr.hook';
import { buildReqFilter } from '@/utils/functions.util';

interface Option {
  data: Array<SelectOption>;
}

interface SelectProps {
  name: string;
  label: string;
  controller: Control<FieldValues>;
  urlData?: string;
  disabled?: boolean;
  fixedData?: Array<SelectOption>;
  inputStyle?: SxProps<Theme>;
  validation?: Record<string, unknown>;
  bodyContent?: Record<string, string | null>;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  controller,
  urlData = '',
  fixedData = [],
  validation = {},
  inputStyle = {},
  bodyContent = {},
  disabled = false,
}) => {
  const theme = useTheme();

  const requestFilter = buildReqFilter({
    customFields: bodyContent,
  });

  const { data, refresh, isLoading } = !fixedData.length
    ? usePOST<Option>(urlData, requestFilter)
    : { data: null, refresh: () => {}, isLoading: false };

  useEffect(() => {
    refresh();
  }, [urlData]);

  const options: Array<SelectOption> = [fixedData, data?.data ?? []]
    .flat()
    .filter(Boolean);

  return (
    <Controller
      name={name}
      rules={validation}
      control={controller}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          loading={isLoading}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, val) => option.value === val.value}
          value={options.find((option) => option.value === value) || null}
          onChange={(_, newValue) => onChange(newValue?.value)}
          disabled={disabled}
          sx={inputStyle}
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
                  {error?.message}
                </Typography>
              }
            />
          )}
        />
      )}
    />
  );
};

export default Select;
