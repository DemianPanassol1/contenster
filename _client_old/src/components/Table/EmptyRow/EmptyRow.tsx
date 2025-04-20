import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';

const EmptyRow: React.FC = () => {
  const theme = useTheme();

  const { t } = useTranslation(['common']);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
        padding: '0.75rem',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <Typography variant="body2">{t('common:noRecordsFound')}</Typography>
    </Box>
  );
};

export default EmptyRow;
