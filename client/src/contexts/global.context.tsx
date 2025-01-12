import { Theme } from '@emotion/react';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

import theme from '../settings/themes.setting';

interface GlobalState {
  mode: 'light' | 'dark';
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme) | null;
  loading: boolean;
  drawerState: boolean;
  dialogState: boolean;
}

interface GlobalContextProps {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'CHANGE_MODE'; payload: GlobalState['mode'] }
  | { type: 'CHANGE_THEME'; payload: GlobalState['theme'] }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'TOGGLE_DIALOG' }
  | { type: 'RESET_THEME' }
  | { type: 'RESET_MODE' };

const mode = (localStorage.getItem('mode') as GlobalState['mode']) || 'light';

const initialState: GlobalState = {
  mode: mode,
  theme: theme[mode],
  loading: false,
  drawerState: false,
  dialogState: false,
};

const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'CHANGE_MODE':
      localStorage.setItem('mode', action.payload);
      return {
        ...state,
        mode: action.payload,
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'RESET_MODE':
      return {
        ...state,
        mode: initialState.mode,
      };
    case 'RESET_THEME':
      return {
        ...state,
        theme: initialState.theme,
      };
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
    default:
      return state;
  }
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  const getTheme = () => context.state.theme;

  const getDrawerState = () => context.state.drawerState;

  const getDialogState = () => context.state.dialogState;

  const setTheme = (mode: GlobalState['mode']) => {
    context.dispatch({ type: 'CHANGE_MODE', payload: mode });
    context.dispatch({ type: 'CHANGE_THEME', payload: theme[mode] });
  };

  const toggleDrawer = () => context.dispatch({ type: 'TOGGLE_DRAWER' });

  const toggleDialog = () => context.dispatch({ type: 'TOGGLE_DIALOG' });

  return {
    ...context,
    getTheme,
    getDrawerState,
    getDialogState,
    setTheme,
    toggleDrawer,
    toggleDialog,
  };
};
