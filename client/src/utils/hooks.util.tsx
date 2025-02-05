import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import useSWR, { useSWRConfig } from 'swr';
import { useMemo, useRef, useCallback } from 'react';
import { useNavigate as useNavigateHook } from 'react-router-dom';
import { useMediaQuery, useSessionStorage } from '@uidotdev/usehooks';

import CloseIcon from '@mui/icons-material/Close';

import { ApiRequest } from '../settings/services.setting';

type NavigateFunction = (url?: string | number) => void;

/**
 * Hook to detect if the screen is mobile.
 */
export const useMobileScreen = (): boolean =>
  useMediaQuery('only screen and (max-width : 768px)');

/**
 * Hook to perform GET requests with SWR.
 *
 * @param url - Endpoint for the request.
 * @param revalidate - Defines if revalidation should occur.
 * @returns Request data, loading state, and function to force update.
 */
export const useGET = (url: string, revalidate = false) => {
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
    isLoading: Boolean(isLoading || error),
    refresh: async (key: string | undefined) => mutate(key || url),
  };
};

/**
 * Hook to perform POST requests with SWR.
 *
 * @param url - Endpoint for the request.
 * @param body - Request body.
 * @param revalidate - Defines if revalidation should occur.
 * @returns Request data, loading state, and function to force update.
 */
export const usePOST = (
  url: string,
  body: Record<string, unknown>,
  revalidate = false
) => {
  const { mutate } = useSWRConfig();

  const ApiPostRequest = (url: string, body: Record<string, unknown>) =>
    ApiRequest('post', url, body);

  const { data, error, isLoading } = useSWR(
    [url, body],
    ([url, data]) => ApiPostRequest(url, data),
    {
      keepPreviousData: true,
      revalidateOnMount: true,
      revalidateIfStale: revalidate,
      revalidateOnFocus: revalidate,
      revalidateOnReconnect: revalidate,
    }
  );

  return {
    data: data?.data?.body ?? null,
    isLoading: Boolean(isLoading || error),
    refresh: async (key: string | undefined) => mutate(key || url),
  };
};

/**
 * Hook to generate a unique page key.
 *
 * @returns Object containing the generated keys.
 */
export const useGenPageKey = (): PageKey => {
  const { current } = useRef({
    key1: Math.random() * 100,
    key2: Math.random() * 100,
    key3: Math.random() * 100,
  });

  return useMemo(() => current, [current]);
};

/**
 * Hook to get route parameters.
 *
 * @returns Object containing the parameters id, type, and slug.
 */
export const useRouteParams = (): RouteParams => {
  const { pathname } = new URL(window.location.href);
  const [slug, type, id] = pathname.split('/').filter(Boolean);

  return {
    id: id ?? null,
    type: type ?? null,
    slug: slug ?? null,
  };
};

/**
 * Hook to access the user session.
 *
 * @returns User session or null if there is no session.
 */
export const useUserSession = (): Session | null => {
  const [session] = useSessionStorage<Session | null>('session', null);

  return session;
};

/**
 * Hook to get permissions based on the current or searched slug.
 *
 * @param searchSlug - Optional slug to search for permissions.
 * @returns Corresponding permission object.
 */
export const usePermissions = (searchSlug: string | null = null): Permission => {
  const session = useUserSession();
  const { slug } = useRouteParams();

  return (
    session?.permissions?.find((item) => item.slug === (searchSlug || slug)) ?? {
      id: 0,
      slug: slug || '',
      title: null,
      canRead: true,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
    }
  );
};

/**
 * Hook for simplified navigation.
 *
 * @returns Navigation function with fallback to the current slug.
 */
export const useNavigate = (): NavigateFunction => {
  const { slug } = useRouteParams();
  const navigate = useNavigateHook();

  return useCallback(
    (url?: string | number) => {
      if (typeof url === 'number') {
        return navigate(url);
      }

      navigate(url || `/${slug}`);
    },
    [navigate, slug]
  );
};

/**
 * Hook to display toast messages.
 *
 * @returns Functions to display messages of different types.
 */
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
    [enqueueSnackbar]
  );
  const warnMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'warning', ...toastOptions }),
    [enqueueSnackbar]
  );
  const infoMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'info', ...toastOptions }),
    [enqueueSnackbar]
  );
  const successMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'success', ...toastOptions }),
    [enqueueSnackbar]
  );
  const errorMessage = useCallback(
    (text: string) => enqueueSnackbar(text, { variant: 'error', ...toastOptions }),
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
