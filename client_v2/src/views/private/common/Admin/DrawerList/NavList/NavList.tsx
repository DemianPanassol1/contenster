import {
  Collapse,
  List,
  ListSubheader,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import React, { ReactNode } from 'react';

interface NavListProps {
  children: ReactNode;
  drawer: boolean;
  title: string;
  customStyles?: SxProps<Theme>;
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
