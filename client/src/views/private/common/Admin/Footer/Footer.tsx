import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import strings from '@/strings';

const Footer: React.FC = () => {
  const theme = useTheme();
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
        {strings.common.copyRight(new Date().getFullYear().toString())}
      </Typography>
    </Box>
  );
};

export default Footer;
