import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { Theme } from '@emotion/react';

import theme from '../settings/themes.setting';
import { useGET } from '../utils/hooks.util';
import { GET_CONFIG_INFO } from '../routes/contenster/global';

interface GlobalState {
  mode: 'light' | 'dark';
  theme: Theme;
  loading: boolean;
  drawerState: boolean;
  dialogState: boolean;
  configInfo: Configuration | null;
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
  code: string;
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
  | { type: 'SET_CONFIG_INFO'; payload: GlobalState['configInfo'] };

const getInitialMode = (): GlobalState['mode'] => {
  return (localStorage.getItem('mode') as GlobalState['mode']) || 'light';
};

const getConfigInfo = (): GlobalState['configInfo'] => {
  const configInfo = localStorage.getItem('configInfo');

  return configInfo ? (JSON.parse(configInfo) as GlobalState['configInfo']) : null;
};

const initialState: GlobalState = {
  mode: getInitialMode(),
  theme: theme[getInitialMode()] || theme.light,
  loading: false,
  drawerState: false,
  dialogState: false,
  configInfo: getConfigInfo(),
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
    default:
      return state;
  }
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const { data, isLoading } = useGET(GET_CONFIG_INFO, true);

  const getTheme = () => state.theme;

  const getDrawerState = () => state.drawerState;

  const getDialogState = () => state.dialogState;

  const getConfigInfo = () => state.configInfo;

  const setTheme = (mode: 'light' | 'dark') => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };

  const toggleDrawer = () => dispatch({ type: 'TOGGLE_DRAWER' });

  const toggleDialog = () => dispatch({ type: 'TOGGLE_DIALOG' });

  const resetSettings = () => dispatch({ type: 'RESET_SETTINGS' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mode', state.mode);
    }
  }, [state.mode]);

  useEffect(() => {
    dispatch({ type: 'SET_CONFIG_INFO', payload: data });
  }, [isLoading, data]);

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
