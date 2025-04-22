import React from 'react';
import { AnimatePresence } from 'motion/react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';

import router from './router';
import darkTheme from '@/themes/dark.theme';
import lightTheme from '@/themes/light.theme';
import { useGlobalContext } from '@/contexts/global.context';

const App: React.FC = () => {
  const {
    state: { theme },
  } = useGlobalContext();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            '::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.grey[300],
            },
            '::-webkit-scrollbar': {
              width: '6px',
              backgroundColor: theme.palette.grey[300],
            },
            '::-webkit-scrollbar-thumb': {
              cursor: 'pointer',
              backgroundColor: theme.palette.primary.main,
            },
          },
        })}
      />
    </ThemeProvider>
  );
};

export default App;
