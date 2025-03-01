import {
  Typography,
  FormControlLabel,
  Checkbox as CheckboxComponent,
  useTheme,
  Tooltip,
  SxProps,
  Theme,
} from '@mui/material';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

interface CheckboxProps {
  name: string;
  label: string;
  controller: Control<FieldValues>;
  tooltip?: string;
  size?: 'small' | 'medium';
  inputStyle?: SxProps<Theme>;
  validation?: Record<string, unknown>;
  disabled?: boolean;
  required?: boolean;
  helperText?: string | null;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  controller,
  tooltip = '',
  size = 'small',
  inputStyle = {},
  validation = {},
  disabled = false,
  required = false,
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
            required={required}
            disabled={disabled}
            sx={{ ...inputStyle }}
            control={
              <Tooltip title={tooltip}>
                <CheckboxComponent
                  size={size}
                  name={field.name}
                  value={Boolean(field.value)}
                  checked={Boolean(field.value)}
                  onBlur={field.onBlur}
                  id={`checkbox-${name}`}
                  // autoComplete={field.name}
                  onChange={field.onChange}
                />
              </Tooltip>
            }
          />
          {helperText && (
            <Typography
              sx={{ color: theme.palette.error.main }}
              variant="caption"
            >
              {helperText}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default Checkbox;
