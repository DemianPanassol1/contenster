import React from 'react';
import { Box, Skeleton } from '@mui/material';

const NavListItemSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        marginBottom: '1rem',
      }}
    >
      <Skeleton
        variant="rounded"
        sx={{
          margin: '0.5rem 1rem 0.2rem',
          height: '22px',
          width: '50%',
        }}
      />
      {Array.from(Array(3).keys()).map((key) => (
        <Skeleton
          key={key}
          variant="rectangular"
          sx={{
            margin: '0.5rem 1rem',
            height: '40px',
          }}
        />
      ))}
    </Box>
  );
};

export default NavListItemSkeleton;
