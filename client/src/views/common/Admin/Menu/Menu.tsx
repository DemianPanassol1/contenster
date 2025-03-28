import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemIcon,
  Menu as MenuComponent,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useState, MouseEvent } from 'react';
import { useSessionStorage } from '@uidotdev/usehooks';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import Logout from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';

import { SIGN_OUT } from '../../../../routes/contenster/global';
import { useGlobalContext } from '../../../../contexts/global.context';

const Menu: React.FC = () => {
  const {
    handleOnSubmit,
    toggleDialog,
    state: { loading },
  } = useGlobalContext();
  const theme = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation(['common']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [session, setSession] = useSessionStorage<Session | null>('session', null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

  const handleLogout = () => {
    handleOnSubmit({
      type: 'GET',
      url: SIGN_OUT,
      message: false,
      onSuccess: () => {
        setTimeout(() => setSession(null), 500);
      },
    });
  };

  const menuUserOpen = Boolean(anchorEl);

  return (
    <Box sx={{ margin: '0.25rem 0 0' }}>
      <Chip
        clickable
        size="medium"
        variant="outlined"
        onClick={handleClick}
        sx={{ transform: 'scale(1.1)' }}
        label={(session?.name ?? '').split(' ')[0]}
        avatar={
          <Avatar
            src={session?.image}
            alt={session?.name}
          />
        }
      />
      <MenuComponent
        anchorEl={anchorEl}
        open={menuUserOpen}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              boxShadow: 2,
              width: '280px',
            },
          },
        }}
      >
        <MenuItem sx={{ paddingX: '0.75rem' }}>
          <ListItemIcon>
            <Avatar
              alt={session?.name}
              src={session?.image}
              title="imagem do usuário"
              sx={{
                marginRight: '1rem',
                backgroundColor: theme.palette.primary.light,
              }}
            />
          </ListItemIcon>
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                overflow: 'hidden',
                marginBottom: '-0.5rem',
                textOverflow: 'ellipsis',
                textTransform: 'capitalize',
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              {session?.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: theme.typography.fontWeightRegular,
              }}
            >
              {session?.role?.title}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        {(session?.establishmentCount ?? 0) > 1 && (
          <MenuItem
            disabled={loading}
            sx={{ paddingX: '1.3rem' }}
            onClick={() => toggleDialog('establishment')}
          >
            <ListItemIcon
              sx={{
                fontWeight: theme.typography.fontWeightRegular,
              }}
            >
              <ApartmentIcon
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="body2">{t('common:changeEstablishment')}</Typography>
          </MenuItem>
        )}
        <MenuItem
          disabled={loading}
          sx={{ paddingX: '1.3rem' }}
          onClick={() => toggleDialog('password')}
        >
          <ListItemIcon
            sx={{
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            <LockIcon
              color="primary"
              fontSize="small"
            />
          </ListItemIcon>
          <Typography variant="body2">{t('common:changePassword')}</Typography>
        </MenuItem>
        <MenuItem
          to="/profile"
          disabled={loading}
          component={RouterLink}
          sx={{ paddingX: '1.3rem' }}
          selected={pathname.includes('profile')}
        >
          <ListItemIcon
            sx={{
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            <PersonIcon
              color="primary"
              fontSize="small"
            />
          </ListItemIcon>
          <Typography variant="body2">{t('common:profile')}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          disabled={loading}
          onClick={handleLogout}
          sx={{ paddingX: '1.5rem' }}
        >
          <ListItemIcon
            sx={{
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            <Logout
              color="primary"
              fontSize="small"
            />
          </ListItemIcon>
          <Typography variant="body2">{t('common:logout')}</Typography>
        </MenuItem>
      </MenuComponent>
    </Box>
  );
};

export default Menu;
