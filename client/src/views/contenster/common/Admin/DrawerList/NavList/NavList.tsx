import React, { ReactNode } from 'react';
import { Collapse, List, ListSubheader, Typography, useTheme } from '@mui/material';

interface NavListProps {
  children: ReactNode;
  drawer: boolean;
  title: string;
  customStyles?: Record<string, string | number>;
}

const NavList: React.FC<NavListProps> = ({
  children,
  drawer,
  title,
  customStyles = {},
}) => {
  const theme = useTheme();

  return (
    <List
      subheader={
        <Collapse
          in={drawer}
          timeout="auto"
          unmountOnExit
        >
          <ListSubheader
            disableSticky
            sx={{
              mb: '0.5rem',
              height: 'auto',
              backgroundColor: theme.palette.primary.main,
              ...customStyles,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textTransform: 'uppercase',
                color: theme.palette.primary.contrastText,
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              {title}
            </Typography>
          </ListSubheader>
        </Collapse>
      }
    >
      {children}
    </List>
  );
};

export default NavList;
