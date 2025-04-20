import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import { GlobalProvider } from './contexts/global.context';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={4}
      autoHideDuration={5000}
    >
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
