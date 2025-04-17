import {
  Theme,
  SxProps,
  useTheme,
  Typography,
  FormControlLabel,
  Switch as SwitchComponent,
} from '@mui/material';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

type SizeSwitch = 'small' | 'medium';

interface SwitchProps {
  name: string;
  label: string;
  controller: Control<FieldValues>;
  size?: SizeSwitch;
  validation?: Record<string, unknown>;
  inputStyle?: SxProps<Theme>;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  controller,
  size = 'small',
  validation = {},
  inputStyle = {},
  disabled = false,
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
          {error && (
            <Typography
              variant="caption"
              sx={{ color: theme.palette.error.main }}
            >
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default Switch;
