import { ThemeProvider } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useGlobalContext } from './contexts/global.context';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>teste</h1>, // {/* <Admin /> */},
//     // errorElement: <Error />,
//     children: [
//       /* ...adminViews */
//     ],
//   },
//   // {
//   //   path: '/auth',
//   //   element: <Auth />,
//   //   errorElement: <Error />,
//   //   children: [...authViews],
//   // },
// ]);

import './settings/i18n.setting';

const App = () => {
  const { getTheme, changeLanguage } = useGlobalContext();

  const theme = getTheme();

  const { t } = useTranslation(['common']);

  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <p key={1}>{t('common:test')}</p>
        <button
          key={2}
          onClick={() => changeLanguage('es')}
        >
          teste
        </button>
        {/* <RouterProvider router={router} /> */}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
