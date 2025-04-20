import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import strings from '@/strings';

const EmptyRow: React.FC = () => {
  const theme = useTheme();

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
      <Typography variant="body2">{strings.common.noRecordsFound}</Typography>
    </Box>
  );
};

export default EmptyRow;
