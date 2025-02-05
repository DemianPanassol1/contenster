import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from '@mui/material';
import React, { MouseEvent } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import { useMobileScreen } from '../../../../../../../utils/hooks.util';
import { useGlobalContext } from '../../../../../../../contexts/global.context';

import Icon from '../../../../../../../components/Icon';

interface NavListItemProps {
  title: string;
  drawer: boolean;
  disabled: boolean;
  icon: string;
  slug: string;
  nested?: Array<{
    id: string;
    title: string;
    slug: string;
    icon: string;
  }> | null;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const NavListItem: React.FC<NavListItemProps> = ({
  title,
  drawer,
  disabled,
  icon,
  slug,
  nested = null,
}) => {
  const theme = useTheme();
  const isMobile = useMobileScreen();
  const { pathname } = useLocation();
  const { toggleDrawer } = useGlobalContext();

  const handleListItemClick = () => {
    if (isMobile) setTimeout(() => toggleDrawer(), 500);
  };

  const selectedCheck = pathname.split('/').filter(Boolean).shift() === slug;

  return (
    <>
      <Tooltip
        placement="right"
        title={!drawer && title}
      >
        <ListItemButton
          to={slug || ''}
          disabled={disabled}
          sx={{
            color: theme.palette.primary.contrastText,
            stroke: theme.palette.primary.contrastText,
            transition: theme.transitions.create('all'),
            '&.Mui-selected': {
              position: 'relative',
              backgroundColor: theme.palette.primary.dark,
              '::before': {
                top: 0,
                left: 0,
                content: '""',
                height: '100%',
                width: '0.5rem',
                display: 'block',
                position: 'absolute',
                backgroundColor: theme.palette.secondary.light,
              },
            },
            ':hover': {
              backgroundColor: 'transparent',
              color: theme.palette.secondary.light,
              stroke: theme.palette.secondary.light,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                stroke: theme.palette.primary.contrastText,
              },
            },
          }}
          component={RouterLink}
          onClick={() => handleListItemClick()}
          selected={selectedCheck}
        >
          <ListItemIcon
            sx={{
              ml: '0.4rem',
              minWidth: '2.2rem',
            }}
          >
            <Icon icon={icon} />
          </ListItemIcon>
          <ListItemText
            primary={title}
            sx={{
              width: 'auto',
              opacity: 1,
              transition: theme.transitions.create(['width', 'opacity'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ...(!drawer && {
                width: 0,
                opacity: 0,
              }),
            }}
            slotProps={{ primary: { variant: 'body2' } }}
          />
        </ListItemButton>
      </Tooltip>
      {nested && (
        <Collapse
          in={pathname.includes(slug || '')}
          timeout="auto"
          unmountOnExit
          sx={{
            backgroundColor: theme.palette.primary.dark,
          }}
        >
          {nested.map((item) => (
            <Tooltip
              key={item.id}
              placement="right"
              title={!drawer && item.title}
            >
              <ListItemButton
                disabled={disabled}
                component={RouterLink}
                to={`${slug}/${item.slug}`}
                sx={{
                  color: theme.palette.primary.contrastText,
                  stroke: theme.palette.primary.contrastText,
                  transition: theme.transitions.create('all'),
                  '&.Mui-selected': {
                    position: 'relative',
                    backgroundColor: theme.palette.primary.dark,
                    '::before': {
                      top: 0,
                      left: 0,
                      content: '""',
                      height: '100%',
                      width: '0.5rem',
                      display: 'block',
                      position: 'absolute',
                      backgroundColor: theme.palette.secondary.light,
                    },
                  },
                  ':hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.secondary.light,
                    stroke: theme.palette.secondary.light,
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.dark,
                      color: theme.palette.primary.contrastText,
                      stroke: theme.palette.primary.contrastText,
                    },
                  },
                }}
                selected={selectedCheck}
              >
                <ListItemIcon
                  sx={{
                    ml: '0.4rem',
                    minWidth: '2.2rem',
                    transition: theme.transitions.create('margin'),
                    marginLeft: '0.4rem',
                    ...(drawer && {
                      marginLeft: '1.8rem',
                    }),
                  }}
                >
                  <Icon icon={item.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    width: 'auto',
                    opacity: 1,
                    transition: theme.transitions.create(['width', 'opacity'], {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(!drawer && {
                      width: 0,
                      opacity: 0,
                    }),
                  }}
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItemButton>
            </Tooltip>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default NavListItem;
