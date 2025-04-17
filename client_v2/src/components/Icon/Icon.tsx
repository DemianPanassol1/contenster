import React from 'react';
import { ReactSVG } from 'react-svg';
import { Box, SvgIcon } from '@mui/material';

interface IconProps {
  icon: string | React.ElementType;
  scale?: number;
}

const Icon: React.FC<IconProps> = ({ icon, scale = 1 }) => {
  if (typeof icon === 'string') {
    return (
      <Box
        src={icon}
        component={ReactSVG}
        beforeInjection={(svg: SVGElement) => {
          svg.style.scale = `${scale}`;
          svg.style.fill = 'none';
          svg.style.fillOpacity = '0';
          svg.style.strokeWidth = '1.2';
          svg.style.stroke = 'inherit';
          svg.style.paddingTop = '5px';
        }}
      />
    );
  }

  return (
    <SvgIcon
      fill="none"
      fillOpacity={0}
      stroke="inherit"
      component={icon}
      strokeWidth={1.5}
      sx={{ width: '1.2rem', height: '1.2rem' }}
    />
  );
};

export default Icon;
