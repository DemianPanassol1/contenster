import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import useSWR, { useSWRConfig } from 'swr';
import { useMemo, useRef, useCallback } from 'react';
import { useNavigate as useNavigateHook } from 'react-router-dom';
import { useMediaQuery, useSessionStorage } from '@uidotdev/usehooks';

import CloseIcon from '@mui/icons-material/Close';

import { ApiRequest } from '../settings/services.setting';

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

interface Session {
  id: number;
  name: string;
  email: string;
  image: string;
  username: string;
  isActive: boolean;
  phone: string;
  homePage: string;
  establishmentCount: number;
  role: {
    id: number;
    title: string;
    description: string;
  };
  permissions: {
    id: number;
    slug: string;
    title: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
  establishment: {
    id: number;
    document: string;
    documentType: string;
    email: string;
    phone1: string;
    phone2: string;
    address: string;
    addressNumber: string;
    zipCode: string;
    district: string;
    corporateName: string;
    fantasyName: string;
    image: string;
  };
}

export const useMobileScreen = (): boolean =>
  useMediaQuery('only screen and (max-width : 768px)');

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

export const useUserSession = (): Session | null => {
  const [session] = useSessionStorage<Session | null>('session', null);

  return session;
};

export const usePermissions = (searchSlug = null) => {
  const session = useUserSession();
  const { slug } = useRouteParams();

  return (
    session?.permissions?.find((item) => item.slug === (searchSlug || slug)) ?? {
      id: 0,
      slug,
      title: null,
      canRead: true,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
    }
  );
};

export const useNavigate = (): NavigateFunction => {
  const { slug } = useRouteParams();
  const navigate = useNavigateHook();

  return useCallback(
    (url?: string) => {
      navigate(url || `/${slug}`);
    },
    [navigate, slug]
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
