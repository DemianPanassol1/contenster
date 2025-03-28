import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';

import { useGET } from '../../../../utils/hooks.util';
import { GET_MODULES_LIST } from '../../../../routes/contenster/global';

import NavList from './NavList';
import NavListItem from './NavList/NavListItem';
import NavListItemSkeleton from './NavList/NavListItemSkeleton';

interface DrawerListProps {
  drawer: boolean;
  loading: boolean;
}

const DrawerList: React.FC<DrawerListProps> = ({ drawer, loading }) => {
  const theme = useTheme();

  const { data, isLoading }: GetModulesList = useGET(GET_MODULES_LIST, true);

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
        : Array.from(Array(2).keys()).map((key) => <NavListItemSkeleton key={key} />)}
    </Box>
  );
};

DrawerList.propTypes = {
  drawer: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DrawerList;
