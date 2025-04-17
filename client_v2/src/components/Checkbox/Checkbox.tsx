import {
  Theme,
  SxProps,
  Tooltip,
  useTheme,
  Typography,
  FormControlLabel,
  Checkbox as CheckboxComponent,
} from '@mui/material';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

type CheckboxSize = 'small' | 'medium';

interface CheckboxProps {
  name: string;
  label: string;
  tooltip: string;
  controller: Control<FieldValues>;
  size?: CheckboxSize;
  inputStyle?: SxProps<Theme>;
  validation?: Record<string, unknown>;
  disabled?: boolean;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  tooltip,
  controller,
  size = 'small',
  inputStyle = {},
  validation = {},
  disabled = false,
  required = false,
}) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={controller}
      rules={validation}
      render={({ field, fieldState: { error } }) => (
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
                  onChange={field.onChange}
                />
              </Tooltip>
            }
          />
          {error && (
            <Typography
              sx={{ color: theme.palette.error.main }}
              variant="caption"
            >
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default Checkbox;
