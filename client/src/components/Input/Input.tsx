import {
  InputLabel,
  Typography,
  FormControl,
  Input as InputComponent,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { Controller, Control, FieldValues } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputProps {
  name: string;
  label: string;
  mask?: string;
  controller: Control<FieldValues>;
  type?: 'text' | 'password';
  validation?: Record<string, unknown>;
  inputStyle?: React.CSSProperties;
  disabled?: boolean;
  helperText?: string | null;
  containerStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  mask = '',
  controller,
  type = 'text',
  validation = {},
  inputStyle = {},
  disabled = false,
  helperText = null,
  containerStyle = {},
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (showPassword) {
      setTimeout(() => setShowPassword(false), 5000);
    }
  }, [showPassword]);

  return (
    <Controller
      name={name}
      control={controller}
      rules={validation}
      render={({ field }) => {
        return (
          <FormControl
            variant="standard"
            sx={{
              ...{
                margin: '0 0 1rem 0',
              },
              ...containerStyle,
            }}
          >
            <InputLabel htmlFor={`input-${field.name}`}>{label}</InputLabel>
            {mask ? (
              <PatternFormat
                type={type}
                size="small"
                format={mask}
                name={field.name}
                value={field.value}
                disabled={disabled}
                onBlur={field.onBlur}
                autoComplete={field.name}
                onChange={field.onChange}
                id={`input-${field.name}`}
                customInput={InputComponent}
                sx={{ ...inputStyle }}
              />
            ) : (
              <InputComponent
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                size="small"
                name={field.name}
                disabled={disabled}
                value={field.value}
                onBlur={field.onBlur}
                autoComplete={field.name}
                onChange={field.onChange}
                id={`input-${field.name}`}
                sx={{ ...inputStyle }}
                endAdornment={
                  type === 'password' && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
            )}
            {helperText && (
              <Typography
                sx={{ color: theme.palette.error.main }}
                variant="caption"
              >
                {helperText}
              </Typography>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default Input;
