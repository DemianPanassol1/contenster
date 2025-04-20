import React from 'react';
import { Drawer as DrawerComponent, Theme, useTheme } from '@mui/material';

import { DRAWER_WIDTH } from '@/utils/consts.util';
import { useMobileScreen } from '@/hooks/common.hook';
import { useGlobalContext } from '@/contexts/global.context';

import DrawerHeader from '../DrawerHeader';
import DrawerList from '../DrawerList';

const openedMixin = (theme: Theme) => ({
  width: DRAWER_WIDTH,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme) => ({
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const Drawer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMobileScreen();

  const {
    toggleDrawer,
    state: { drawerState, loading },
  } = useGlobalContext();

  return (
    <DrawerComponent
      open={drawerState}
      sx={{
        flexShrink: 0,
        height: '100vh',
        width: DRAWER_WIDTH,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(drawerState && {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!drawerState && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
      }}
      onClose={() => toggleDrawer()}
      PaperProps={{
        sx: {
          height: '100vh',
          overflow: 'clip',
          width: DRAWER_WIDTH,
          paddingBottom: '1rem',
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
        },
      }}
      variant={isMobile ? 'temporary' : 'permanent'}
    >
      <DrawerHeader
        loading={loading}
        drawer={drawerState}
      />
      <DrawerList
        loading={loading}
        drawer={drawerState}
      />
    </DrawerComponent>
  );
};

export default Drawer;
