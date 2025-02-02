import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Toolbar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import { useGlobalContext } from '../../../../../contexts/global.context';

import Menu from '../Menu';

const Header: React.FC = () => {
  const {
    state: { drawerState },
    toggleDrawer,
  } = useGlobalContext();
  const { t } = useTranslation(['common']);

  return (
    <Box
      component="header"
      sx={{ margin: '0.25rem 0' }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => toggleDrawer()}
          title={t(drawerState ? 'common:closeMenu' : 'common:openMenu')}
        >
          {drawerState ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <Menu />
      </Toolbar>
    </Box>
  );
};

export default Header;
