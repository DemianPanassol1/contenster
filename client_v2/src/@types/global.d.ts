type theme = 'light' | 'dark';

interface GlobalState {
  loading: boolean;
  theme: theme;
  drawerState: boolean;
  dialogState: boolean;
}

interface GlobalSubmitProps {
  type: HTTPMethod & 'POST/FILE';
  endpoint: string;
  body?: object;
  message?: string | boolean;
  onSuccess?: (response?: unknown) => void;
  onError?: (error?: unknown) => void;
}

interface GlobalContextProps {
  state: GlobalState;
  toggleLoading: () => void;
  toggleTheme: () => void;
  toggleDrawer: () => void;
  toggleDialog: () => void;
  handleOnSubmit: (props: GlobalSubmitProps) => void;
}
