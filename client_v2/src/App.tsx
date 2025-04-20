import React from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import darkTheme from '@/themes/dark.theme';
import lightTheme from '@/themes/light.theme';
import { useGlobalContext } from '@/contexts/global.context';

import Error from '@/views/general/Error';
import Auth from '@/views/public/common/Auth';
import Admin from '@/views/private/common/Admin';

import publicContensterViews from '@/views/public/contenster';
import privateContensterViews from '@/views/private/contenster';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Admin />,
    errorElement: <Error />,
    children: [...privateContensterViews],
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <Error />,
    children: [...publicContensterViews],
  },
]);

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
