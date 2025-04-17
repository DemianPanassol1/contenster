import React from 'react';
import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material';

type SectionTitleVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1';

interface SectionTitleProps {
  title: string;
  barStyles?: SxProps<Theme>;
  titleStyles?: SxProps<Theme>;
  containerStyles?: SxProps<Theme>;
  variant?: SectionTitleVariant;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  variant = 'h6',
  barStyles = {},
  titleStyles = {},
  containerStyles = {},
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ ...containerStyles }}>
      <Typography
        variant={variant}
        fontWeight={500}
        sx={{ ...titleStyles }}
        textTransform="capitalize"
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          margin: '0.3rem 0 0',
          opacity: 0.7,
          backgroundColor: theme.palette.primary.light,
          [theme.breakpoints.up('md')]: {
            width: '65%',
          },
          [theme.breakpoints.up('lg')]: {
            width: '45%',
          },
          ...barStyles,
        }}
      />
    </Box>
  );
};

export default SectionTitle;
