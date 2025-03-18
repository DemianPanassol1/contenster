import {
  Autocomplete,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { usePOST } from '../../utils/hooks.util';
import { buildReqFilter } from '../../utils/functions.util';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  label: string;
  controller: Control<FieldValues>;
  urlData?: string;
  disabled?: boolean;
  fixedData?: Option[];
  inputStyle?: SxProps<Theme>;
  validation?: Record<string, any>;
  bodyContent?: Record<string, any>;
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
    ? usePOST(urlData, requestFilter)
    : { data: null, refresh: () => {}, isLoading: false };

  useEffect(() => {
    refresh();
  }, [urlData]);

  const options: Option[] = [fixedData, data?.data].flat().filter(Boolean);

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
