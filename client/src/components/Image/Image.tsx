import React from 'react';
import { Box, Skeleton, SxProps, Theme } from '@mui/material';

type ImageVariant = 'text' | 'rectangular' | 'circular' | 'rounded';

interface ImageProps {
  alt?: string;
  title?: string;
  dimensions: SxProps<Theme>;
  src?: string;
  isLoading?: boolean;
  variant?: ImageVariant;
}

const Image: React.FC<ImageProps> = ({
  alt,
  title,
  dimensions,
  src = '',
  isLoading = false,
  variant = 'rounded',
}) => {
  const extractAltFromSrc = (src: string) => {
    const parts = src.split('/');
    return parts[parts.length - 1].split('.')[0];
  };

  const computedAlt = alt || extractAltFromSrc(src);
  const computedTitle = title || `Image of ${computedAlt}`;

  return isLoading || !src ? (
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
      alt={computedAlt}
      title={computedTitle}
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
