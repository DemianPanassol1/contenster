import {
  Theme,
  Tooltip,
  SxProps,
  IconButton as IconButtonComponent,
} from '@mui/material';
import React, { ReactNode } from 'react';

type IconButtonColor =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';
type IconButtonEdge = 'start' | 'end';
type IconButtonSize = 'large' | 'medium' | 'small';

interface IconButtonProps {
  icon: ReactNode;
  edge?: IconButtonEdge;
  tippy?: string;
  size?: IconButtonSize;
  disabled?: boolean;
  color?: IconButtonColor;
  customStyles?: SxProps<Theme>;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  edge = 'start',
  tippy = '',
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
