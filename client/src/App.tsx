import { ThemeProvider } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useGlobalContext } from './contexts/global.context';

import './settings/i18n.setting';

import Auth from './views/common/Auth';
import Admin from './views/common/Admin';
import Error from './views/common/Error';

import { adminViews, authViews } from './views';

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
  );
};

export default App;
