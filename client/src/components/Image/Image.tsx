import React from 'react';
import { Box, Skeleton } from '@mui/material';

interface ImageProps {
  alt: string;
  title: string;
  dimensions: React.CSSProperties;
  src?: string;
  isLoading?: boolean;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
}

const Image: React.FC<ImageProps> = ({
  alt,
  title,
  dimensions,
  src = '',
  isLoading = false,
  variant = 'rounded',
}) => {
  return isLoading ? (
    <Skeleton
      variant={variant}
      sx={{
        display: 'block',
        ...dimensions,
      }}
    />
  ) : (
    <Box
      src={src}
      alt={alt}
      title={title}
      component="img"
      sx={{
        width: '100%',
        height: '100%',
        ...dimensions,
      }}
    />
  );
};

export default Image;
