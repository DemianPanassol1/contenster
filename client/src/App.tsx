import { ThemeProvider } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useGlobalContext } from './contexts/global.context';

import './settings/i18n.setting';

import Auth from './views/contenster/common/Auth';
import Admin from './views/contenster/common/Admin';
import Error from './views/contenster/common/Error';

import { authViews } from './views/contenster/public';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Admin />,
    errorElement: <Error />,
    children: [],
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
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
