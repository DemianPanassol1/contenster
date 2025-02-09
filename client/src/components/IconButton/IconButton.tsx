import React, { ReactNode, CSSProperties } from 'react';
import { Tooltip, IconButton as IconButtonComponent } from '@mui/material';

interface IconButtonProps {
  icon: ReactNode;
  edge?: 'start' | 'end';
  tippy?: string | null;
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  customStyles?: CSSProperties;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  edge = 'start',
  tippy = null,
  size = 'small',
  disabled = false,
  color = 'primary',
  customStyles = {},
  onClick = () => null,
}) => {
  return (
    <Tooltip title={tippy}>
      <IconButtonComponent
        color={color}
        edge={edge}
        sx={customStyles}
        size={size}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </IconButtonComponent>
    </Tooltip>
  );
};

export default IconButton;
