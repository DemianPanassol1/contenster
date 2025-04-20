import React from 'react';
import { Box, useTheme } from '@mui/material';

import routes from '@/routes';
import { useGET } from '@/hooks/swr.hook';

import NavList from './NavList';
import NavListItem from './NavList/NavListItem';
import NavListItemSkeleton from './NavList/NavListItemSkeleton';

interface DrawerListProps {
  drawer: boolean;
  loading: boolean;
}

const DrawerList: React.FC<DrawerListProps> = ({ drawer, loading }) => {
  const theme = useTheme();

  const { data, isLoading } = useGET<Array<ModuleList>>(
    routes.CONTENSTER.GLOBAL.GET_MODULES_LIST,
    true
  );

  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        display: 'flex',
        overflowY: 'auto',
        overflowX: 'clip',
        flexDirection: 'column',
        py: '1rem',
        '::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.primary.light,
          borderRadius: '8px',
        },
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      {!isLoading
        ? (data ?? []).map((module, index) => (
            <NavList
              key={module.id}
              title={module.title}
              drawer={drawer}
              customStyles={{
                ...(index !== 0 && {
                  mt: '0.85rem',
                }),
              }}
            >
              {module.functionalities.map((section) => (
                <NavListItem
                  drawer={drawer}
                  key={section.id}
                  disabled={loading}
                  slug={section.slug}
                  title={section.title}
                  icon={section.icon ?? ''}
                />
              ))}
            </NavList>
          ))
        : Array.from(Array(2).keys()).map((key) => (
            <NavListItemSkeleton key={key} />
          ))}
    </Box>
  );
};

export default DrawerList;
