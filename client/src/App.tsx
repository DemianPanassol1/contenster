import { AnimatePresence } from 'framer-motion';
import { Theme, ThemeProvider } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useGlobalContext } from './contexts/global.context';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Admin />,
  //   errorElement: <Error />,
  //   children: [...adminViews],
  // },
  // {
  //   path: '/auth',
  //   element: <Auth />,
  //   errorElement: <Error />,
  //   children: [...authViews],
  // },
]);

const App = () => {
  const { getTheme } = useGlobalContext();

  const theme = getTheme();

  return (
    <ThemeProvider theme={theme as Partial<Theme> | ((outerTheme: Theme) => Theme)}>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
