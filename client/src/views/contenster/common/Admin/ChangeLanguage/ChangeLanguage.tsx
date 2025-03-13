import { useTranslation } from 'react-i18next';
import React, { MouseEvent, useState } from 'react';
import { Box, Chip, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { useGlobalContext } from '../../../../../contexts/global.context';

import Image from '../../../../../components/Image';

/* TODO: Concluir componente */
const ChangeLanguage: React.FC = () => {
  const {
    state: { configInfo },
  } = useGlobalContext();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

  const changeLanguage = (lang: Language['code']) => {
    i18n.changeLanguage(lang);

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const languages = (configInfo?.languages ?? []).filter(
    (lang) => lang.purpose === 'both' || lang.purpose === 'console'
  );

  const menuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ margin: '0.25rem 0 0' }}>
      <Chip
        clickable
        size="medium"
        variant="outlined"
        onClick={handleClick}
        sx={{ transform: 'scale(1.1)' }}
        avatar={
          <Image
            variant="rectangular"
            src={languages.find((l) => l.code === i18n.language)?.icon ?? ''}
            dimensions={{ width: '1.5rem', height: 'auto' }}
          />
        }
      />
      <Menu
        open={menuOpen}
        anchorEl={anchorEl}
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
        {languages.map((lang) => (
          <MenuItem
            key={lang.id}
            selected={i18n.language === lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            <ListItemIcon>
              <Image
                src={lang.icon}
                variant="rectangular"
                dimensions={{ width: '1.5rem', height: 'auto' }}
              />
            </ListItemIcon>
            <ListItemText>{lang.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChangeLanguage;
