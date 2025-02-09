import { ThemeProvider } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useGlobalContext } from './contexts/global.context';

import './settings/i18n.setting';

import Auth from './views/contenster/common/Auth';
import Admin from './views/contenster/common/Admin';
import Error from './views/contenster/common/Error';

import { authViews } from './views/contenster/public';
import { adminViews } from './views/contenster/private';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Admin />,
    errorElement: <Error />,
    children: [...adminViews],
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <Error />,
    children: [...authViews],
  },
]);

const App = () => {
  const { getTheme } = useGlobalContext();

  return (
    <HelmetProvider>
      <ThemeProvider theme={getTheme()}>
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
    </HelmetProvider>
  );
};

export default App;
