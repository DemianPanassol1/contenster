import React, { createContext, useMemo, ReactNode, useEffect } from 'react';

import {
  ERRORS_STATE,
  LOADING_STATE,
  ERROR_STATE_CHANGED_EVENT,
  LOADING_STATE_CHANGED_EVENT,
} from '@/utils/consts.util';
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
} from '@/services/client.service';
import { useToast } from '@/hooks/toast.hook';
import { useMobileScreen } from '@/hooks/common.hook';

import strings from '@/strings';

const initialState: GlobalState = {
  loading: false,
  theme: 'light',
  drawerState: false,
  dialogState: false,
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const isMobile = useMobileScreen();

  initialState.drawerState = !isMobile;

  const [state, setState] = React.useState<GlobalState>(initialState);

  const { infoMessage, errorMessage, warnMessage, successMessage } = useToast();

  const toggleLoading = (loading?: boolean) => {
    setState((prev) => ({ ...prev, loading: loading || !prev.loading }));
  };

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const toggleDrawer = () => {
    setState((prev) => ({ ...prev, drawerState: !prev.drawerState }));
  };

  const toggleDialog = (dialog: string | null) => {
    setState((prev) => ({ ...prev, dialogState: dialog ?? false }));
  };

  const handleOnSubmit = async ({
    type,
    endpoint,
    body = {},
    message = true,
    onSuccess = () => {},
    onError = () => {},
  }: GlobalSubmitProps) => {
    try {
      let response;

      switch (type) {
        case 'GET':
          response = await handleGetRequest(endpoint);
          break;
        case 'POST':
          response = await handlePostRequest(endpoint, body);
          break;
        case 'PUT':
          response = await handlePutRequest(endpoint, body);
          break;
        case 'DELETE':
          response = await handleDeleteRequest(endpoint);
          break;
        case 'POST/FILE':
          response = await handlePostRequest(endpoint, body, {
            'Content-Type': 'multipart/form-data',
          });
          break;
        default:
          throw new Error('Invalid request type');
      }

      if (response) {
        if (typeof message === 'string') {
          successMessage(message);
        } else if (message) {
          switch (type) {
            case 'GET':
              successMessage(strings.common.registerAquired);
              break;

            case 'POST':
            case 'POST/FILE':
              successMessage(strings.common.registerSaved);
              break;

            case 'PUT':
              successMessage(strings.common.registerUpdated);
              break;

            case 'DELETE':
              successMessage(strings.common.registerDeleted);
              break;

            default:
              break;
          }
        }
        onSuccess(response);
      } else {
        onError(sessionStorage.getItem(ERRORS_STATE));
      }
    } catch (error) {
      console.error(error);
      errorMessage(strings.common.internalError);
    }
  };

  const value = useMemo(
    () => ({
      state,
      toggleLoading,
      toggleTheme,
      toggleDrawer,
      toggleDialog,
      handleOnSubmit,
    }),
    [state]
  );

  useEffect(() => {
    const handleLoadingState = () => {
      const loadingState = sessionStorage.getItem(LOADING_STATE);

      toggleLoading(loadingState ? JSON.parse(loadingState) : undefined);
    };

    const handleErrorState = () => {
      const errorState = sessionStorage.getItem(ERRORS_STATE);

      if (!errorState) return;

      const errorList: Array<ErrorObject> = JSON.parse(errorState);

      errorList.forEach((error) => {
        if (error.code >= 400 && error.code < 500) {
          warnMessage(error.message);
        } else if (error.code >= 500) {
          errorMessage(error.message);
        } else {
          infoMessage(error.message);
        }
      });

      setTimeout(() => {
        sessionStorage.removeItem(ERRORS_STATE);
      }, 500);
    };

    window.addEventListener(ERROR_STATE_CHANGED_EVENT, handleErrorState);
    window.addEventListener(LOADING_STATE_CHANGED_EVENT, handleLoadingState);

    return () => {
      window.removeEventListener(ERROR_STATE_CHANGED_EVENT, handleErrorState);
      window.removeEventListener(
        LOADING_STATE_CHANGED_EVENT,
        handleLoadingState
      );
    };
  }, []);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = (): GlobalContextProps => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
