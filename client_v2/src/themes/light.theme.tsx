import { createTheme } from '@mui/material/styles';
import { green, red, blue } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    common: {
      black: '#28383c',
      white: '#fcfcfc',
    },
    primary: {
      main: '#212121',
      contrastText: '#FCFCFC',
    },
    secondary: {
      main: blue[500],
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#6c757d',
    },
    success: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
  typography: {
    allVariants: {
      fontWeight: 'lighter',
    },
    body1: {
      fontSize: '15px',
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontSize: theme.typography.body2,
          }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontSize: theme.typography.body2,
          }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontWeight: theme.typography.fontWeightLight,
            padding: '0.55rem 1rem',
          }),
        text: ({ theme }) =>
          theme.unstable_sx({
            fontWeight: theme.typography.fontWeightBold,
          }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            marginRight: '0.5rem',
          }),
      },
    },
  },
});

export default lightTheme;
