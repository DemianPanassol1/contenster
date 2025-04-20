import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingComponent: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {Array.from(Array(5).keys()).map((key) => (
        <Skeleton
          key={key}
          variant="rounded"
          sx={{
            margin: '1rem',
            height: '2rem',
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingComponent;
