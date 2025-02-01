/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { Theme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import {
  fetchGET,
  fetchPOST,
  fetchPUT,
  fetchDELETE,
  fetchFILE,
} from '../utils/functions.util';
import config from '../config/settings.json';
import theme from '../settings/themes.setting';
import { useGET, useToast } from '../utils/hooks.util';
import { GET_CONFIG_INFO } from '../routes/contenster/global';

interface HandleSubmitProps {
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'POST/FILE';
  url: string;
  body?: Record<string, any> | null;
  message?: boolean | string;
  onSuccess?: (data: Record<string, any>) => void;
  onError?: (error: Record<string, any>) => void;
}

interface GlobalState {
  mode: 'light' | 'dark';
  theme: Theme;
  loading: boolean;
  drawerState: boolean;
  dialogState: boolean;
  configInfo: Configuration | null;
  i18nextLng: Language['code'];
}

interface Configuration {
  id: number;
  favicon: string;
  loginLogo: string;
  loginBanner: string;
  languages: Language[];
}

interface Language {
  id: number;
  name: string;
  purpose: 'both' | 'console' | 'site' | 'none';
  code: 'en' | 'es' | 'pt';
  icon: string;
  default: boolean;
}

interface GlobalContextProps {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
  getTheme: () => Partial<Theme> | ((outerTheme: Theme) => Theme);
  getDrawerState: () => boolean;
  getDialogState: () => boolean;
  setTheme: (mode: 'light' | 'dark') => void;
  toggleDrawer: () => void;
  toggleDialog: () => void;
  resetSettings: () => void;
  getConfigInfo: () => Configuration | null;
  changeLanguage: (code: Language['code']) => void;
  handleOnSubmit: (props: HandleSubmitProps) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'CHANGE_MODE'; payload: GlobalState['mode'] }
  | { type: 'CHANGE_THEME'; payload: Theme }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'TOGGLE_DIALOG' }
  | { type: 'RESET_SETTINGS' }
  | { type: 'TOOGLE_LOADING'; payload: boolean }
  | { type: 'SET_CONFIG_INFO'; payload: GlobalState['configInfo'] };

const getInitialMode = (): GlobalState['mode'] => {
  return (localStorage.getItem('mode') as GlobalState['mode']) || 'light';
};

const getConfigInfo = (): GlobalState['configInfo'] => {
  const configInfo = localStorage.getItem('configInfo');

  return configInfo ? (JSON.parse(configInfo) as GlobalState['configInfo']) : null;
};

const getActiveLanguage = (): GlobalState['i18nextLng'] => {
  return (
    (localStorage.getItem('i18nextLng') as GlobalState['i18nextLng']) ||
    config.DEFAULT_LANGUAGE
  );
};

const initialState: GlobalState = {
  mode: getInitialMode(),
  theme: theme[getInitialMode()] || theme.light,
  loading: false,
  drawerState: false,
  dialogState: false,
  configInfo: getConfigInfo(),
  i18nextLng: getActiveLanguage(),
};

const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'CHANGE_MODE':
      localStorage.setItem('mode', action.payload);
      return {
        ...state,
        mode: action.payload,
        theme: theme[action.payload] || theme.light,
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'RESET_SETTINGS':
      return initialState;
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerState: !state.drawerState,
      };
    case 'TOGGLE_DIALOG':
      return {
        ...state,
        dialogState: !state.dialogState,
      };
    case 'SET_CONFIG_INFO':
      localStorage.setItem('configInfo', JSON.stringify(action.payload));
      return {
        ...state,
        configInfo: action.payload,
      };
    case 'TOOGLE_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const { i18n, t } = useTranslation(['common']);
  const { data, isLoading } = useGET(GET_CONFIG_INFO, true);
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const { successMessage, errorMessage, warnMessage } = useToast();

  const getTheme = () => state.theme;

  const getDrawerState = () => state.drawerState;

  const getDialogState = () => state.dialogState;

  const getConfigInfo = () => state.configInfo;

  const setTheme = (mode: 'light' | 'dark') => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };

  const changeLanguage = (code: Language['code']) => i18n.changeLanguage(code);

  const toggleDrawer = () => dispatch({ type: 'TOGGLE_DRAWER' });

  const toggleDialog = () => dispatch({ type: 'TOGGLE_DIALOG' });

  const resetSettings = () => dispatch({ type: 'RESET_SETTINGS' });

  const handleOnSubmit = async ({
    type = 'GET',
    url,
    body = null,
    message = true,
    onSuccess = () => null,
    onError = () => null,
  }: HandleSubmitProps) => {
    try {
      dispatch({ type: 'TOOGLE_LOADING', payload: true });

      let response;

      switch (type) {
        case 'GET':
          response = await fetchGET(url);
          break;
        case 'POST':
          response = await fetchPOST(url, body as Record<string, any>);
          break;
        case 'PUT':
          response = await fetchPUT(url, body as Record<string, any>);
          break;
        case 'DELETE':
          response = await fetchDELETE(url);
          break;
        case 'POST/FILE':
          response = await fetchFILE(url, body as Record<string, any>);
          break;
        default:
          response = null;
          break;
      }

      if (!response) throw new Error();

      if (response.success) {
        if (typeof message === 'string') {
          successMessage(message);
        } else if (message) {
          switch (type) {
            case 'GET':
              successMessage(t('common:registerAquired'));
              break;
            case 'POST':
            case 'POST/FILE':
              successMessage(t('common:registerSaved'));
              break;
            case 'PUT':
              successMessage(t('common:registerUpdated'));
              break;
            case 'DELETE':
              successMessage(t('common:registerDeleted'));
              break;
            default:
              break;
          }
        }

        onSuccess(response.body);
      } else {
        response.errors.forEach((error: { message: string }) => {
          warnMessage(error.message);
        });

        onError(response.errors);
      }
    } catch (error) {
      console.error(error);
      errorMessage(t('common:internalError'));
    } finally {
      dispatch({ type: 'TOOGLE_LOADING', payload: false });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mode', state.mode);
    }
  }, [state.mode]);

  useEffect(() => {
    dispatch({ type: 'SET_CONFIG_INFO', payload: data });
  }, [isLoading, data]);

  useEffect(() => {
    if (state.i18nextLng !== i18n.language) {
      i18n.changeLanguage(state.i18nextLng);
    }
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getTheme,
      getConfigInfo,
      getDrawerState,
      getDialogState,
      setTheme,
      toggleDrawer,
      toggleDialog,
      resetSettings,
      changeLanguage,
      handleOnSubmit,
    }),
    [state, dispatch]
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};
