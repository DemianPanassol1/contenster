/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSnackbar } from 'notistack';
import useSWR, { useSWRConfig } from 'swr';
import { useMemo, useRef, useCallback } from 'react';
import { IconButton, useMediaQuery } from '@mui/material';
import { useNavigate as useNavigateHook } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';

import { ApiRequest } from '../settings/services.setting';

interface UseGETReturn<T> {
  data: T | null;
  isLoading: boolean;
  refresh: (key?: string) => Promise<void>;
}

interface PageKey {
  key1: number;
  key2: number;
  key3: number;
}

interface RouteParams {
  id: string | null;
  type: string | null;
  slug: string | null;
}

type NavigateFunction = (url?: string) => void;

interface ToastOptions {
  anchorOrigin: {
    horizontal: 'right' | 'left' | 'center';
    vertical: 'top' | 'bottom';
  };
  action: (snackId: string | number) => JSX.Element;
}

export const useMobileScreen = (): boolean =>
  useMediaQuery('only screen and (max-width : 768px)');

export const useGET = <T = any>(url: string, revalidate = false): UseGETReturn<T> => {
  const { mutate } = useSWRConfig();

  const ApiGetRequest = (url = '') => ApiRequest('get', url);

  const { data, error, isLoading } = useSWR(url, ApiGetRequest, {
    keepPreviousData: true,
    revalidateOnMount: true,
    revalidateIfStale: revalidate,
    revalidateOnFocus: revalidate,
    revalidateOnReconnect: revalidate,
  });

  return {
    data: data?.data?.body ?? null,
    isLoading: Boolean(isLoading || error || !data?.data.success),
    refresh: async (key: string | undefined) => mutate(key || url),
  };
};

export const useGenPageKey = (): PageKey => {
  const { current } = useRef({
    key1: Math.random() * 100,
    key2: Math.random() * 100,
    key3: Math.random() * 100,
  });

  return useMemo(() => current, [current]);
};

export const useRouteParams = (): RouteParams => {
  const { pathname } = new URL(location.href);
  const [slug, type, id] = pathname.split('/').filter(Boolean);

  return {
    id: id ?? null,
    type: type ?? null,
    slug: slug ?? null,
  };
};

export const useNavigate = (): NavigateFunction => {
  const { slug } = useRouteParams();
  const navigate = useNavigateHook();

  return useCallback(
    (url?: string) => {
      navigate(url || `/${slug}`);
    },
    [navigate, slug],
  );
};

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toastOptions: ToastOptions = {
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    action: (snackId) => (
      <IconButton
        aria-label="close snackbar"
        title="Fechar mensagem"
        onClick={() => closeSnackbar(snackId)}
      >
        <CloseIcon />
      </IconButton>
    ),
  };

  const defaultMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'default', ...toastOptions }),
    [enqueueSnackbar],
  );
  const warnMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'warning', ...toastOptions }),
    [enqueueSnackbar],
  );
  const infoMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'info', ...toastOptions }),
    [enqueueSnackbar],
  );
  const successMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'success', ...toastOptions }),
    [enqueueSnackbar],
  );
  const errorMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'error', ...toastOptions }),
    [enqueueSnackbar],
  );

  return {
    defaultMessage,
    warnMessage,
    infoMessage,
    successMessage,
    errorMessage,
  };
};
