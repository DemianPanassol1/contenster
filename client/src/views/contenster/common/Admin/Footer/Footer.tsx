import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        py: theme.spacing(3),
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1">
        {t('common:copyRight', { year: new Date().getFullYear() })}
      </Typography>
    </Box>
  );
};

export default Footer;
