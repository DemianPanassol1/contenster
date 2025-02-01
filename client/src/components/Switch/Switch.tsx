import {
  Typography,
  Switch as SwitchComponent,
  useTheme,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

interface SwitchProps {
  name: string;
  label: string;
  controller: Control<FieldValues>;
  size?: 'small' | 'medium';
  validation?: Record<string, unknown>;
  inputStyle?: Record<string, unknown>;
  disabled?: boolean;
  helperText?: string | null;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  controller,
  size = 'small',
  validation = {},
  inputStyle = {},
  disabled = false,
  helperText = null,
}) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={controller}
      rules={validation}
      render={({ field }) => (
        <>
          <FormControlLabel
            label={label}
            sx={inputStyle}
            disabled={disabled}
            control={
              <SwitchComponent
                size={size}
                name={name}
                color="primary"
                onBlur={field.onBlur}
                onChange={field.onChange}
                value={Boolean(field.value)}
                checked={Boolean(field.value)}
              />
            }
          />
          {helperText && (
            <Typography
              variant="caption"
              sx={{ color: theme.palette.error.main }}
            >
              {helperText}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default Switch;
