import {
  Theme,
  SxProps,
  useTheme,
  Button as ButtonComponent,
} from '@mui/material';
import React from 'react';

type ButtonTypes = 'button' | 'submit' | 'reset';
type VariantTypes = 'text' | 'outlined' | 'contained';

interface ButtonProps {
  content: React.ReactNode;
  loading?: boolean;
  type?: ButtonTypes;
  customStyle?: SxProps<Theme>;
  disabled?: boolean;
  hasLoader?: boolean;
  onClick?: () => void;
  variant?: VariantTypes;
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
    <ButtonComponent
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
    </ButtonComponent>
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
