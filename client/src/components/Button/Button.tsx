import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button as ButtonComponent, SxProps, Theme, useTheme } from '@mui/material';

interface ButtonProps {
  content: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  customStyle?: SxProps<Theme>;
  disabled?: boolean;
  hasLoader?: boolean;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
}

const Button: React.FC<ButtonProps> = ({
  content,
  loading = false,
  type = 'button',
  customStyle = {},
  disabled = false,
  hasLoader = false,
  onClick = () => null,
  variant = 'contained',
}) => {
  const theme = useTheme();

  return hasLoader ? (
    <LoadingButton
      fullWidth
      type={type}
      loading={loading}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={{
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightRegular,
        ...customStyle,
      }}
    >
      {content}
    </LoadingButton>
  ) : (
    <ButtonComponent
      fullWidth
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={{
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightRegular,
        ...customStyle,
      }}
    >
      {content}
    </ButtonComponent>
  );
};

export default Button;
