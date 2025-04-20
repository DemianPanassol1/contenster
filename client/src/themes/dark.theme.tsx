import { createTheme } from '@mui/material/styles';
import { green, red, blue } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    common: {
      black: '#ffffff',
      white: '#121212',
    },
    primary: {
      main: '#90a4ae',
      contrastText: '#121212',
    },
    secondary: {
      main: blue[400],
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
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
            color: theme.palette.text.primary,
          }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontSize: theme.typography.body2,
            color: theme.palette.text.secondary,
          }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontWeight: theme.typography.fontWeightRegular,
            padding: '0.55rem 1rem',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
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

export default darkTheme;
