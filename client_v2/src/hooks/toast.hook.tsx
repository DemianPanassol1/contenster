import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toastOptions: ToastProps = {
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    action: (snackId) => (
      <IconButton
        title="Fechar mensagem"
        aria-label="close snackbar"
        onClick={() => closeSnackbar(snackId)}
      >
        <CloseIcon />
      </IconButton>
    ),
  };

  const defaultMessage = useCallback(
    (text: string) =>
      enqueueSnackbar(text, { variant: 'default', ...toastOptions }),
    [enqueueSnackbar]
  );

  const warnMessage = useCallback(
    (text: string) =>
      enqueueSnackbar(text, { variant: 'warning', ...toastOptions }),
    [enqueueSnackbar]
  );

  const infoMessage = useCallback(
    (text: string) =>
      enqueueSnackbar(text, { variant: 'info', ...toastOptions }),
    [enqueueSnackbar]
  );

  const successMessage = useCallback(
    (text: string) =>
      enqueueSnackbar(text, { variant: 'success', ...toastOptions }),
    [enqueueSnackbar]
  );

  const errorMessage = useCallback(
    (text: string) =>
      enqueueSnackbar(text, { variant: 'error', ...toastOptions }),
    [enqueueSnackbar]
  );

  return {
    defaultMessage,
    warnMessage,
    infoMessage,
    successMessage,
    errorMessage,
  };
};

export { useToast };
