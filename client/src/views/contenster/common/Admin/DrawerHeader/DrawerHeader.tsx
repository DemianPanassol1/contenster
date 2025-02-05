import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, IconButton, Skeleton, Typography, useTheme } from '@mui/material';

import { useGET } from '../../../../../utils/hooks.util';
import { GET_SYNC_USER } from '../../../../../routes/contenster/global';

import Image from '../../../../../components/Image';

interface DrawerHeaderProps {
  drawer: boolean;
  loading: boolean;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ drawer, loading }) => {
  const theme = useTheme();
  const { data, isLoading }: GetSyncUser = useGET(GET_SYNC_USER, true);

  return (
    <>
      <Box
        sx={{
          height: '5.2rem',
          display: 'flex',
          paddingX: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
          [theme.breakpoints.up('sm')]: {
            paddingX: '1.5rem',
          },
          transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(!drawer && {
            paddingX: '0.8rem',
            [theme.breakpoints.up('sm')]: {
              paddingX: '1rem',
            },
          }),
        }}
      >
        <IconButton
          to="/"
          edge="start"
          aria-label="home"
          disabled={loading}
          component={RouterLink}
          sx={{
            width: '3rem',
            height: '3rem',
            margin: '0 0.5rem 0 0',
            ...(!drawer && {
              margin: '0 0.5rem 0 -0.4rem',
            }),
          }}
        >
          <Image
            variant="circular"
            isLoading={isLoading}
            src={data?.establishment?.image}
            dimensions={{ width: '100%', height: '100%' }}
          />
        </IconButton>
        {isLoading ? (
          <Skeleton
            variant="text"
            sx={{
              opacity: 1,
              width: '75%',
              height: '70%',
              ...(!drawer && { opacity: 0 }),
            }}
          />
        ) : (
          <Typography
            variant="h5"
            sx={{
              opacity: 1,
              width: 'auto',
              transition: theme.transitions.create(['width', 'opacity'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ...(!drawer && {
                width: 0,
                opacity: 0,
              }),
            }}
          >
            {data?.establishment?.fantasyName}
          </Typography>
        )}
      </Box>
      <Divider
        color="white"
        variant="middle"
      />
    </>
  );
};

export default DrawerHeader;
