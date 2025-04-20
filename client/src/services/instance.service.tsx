import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';

import config from '@config';

import {
  APP_TOKEN,
  APP_TOKEN_EXP,
  SESSION_STATE,
  SESSION_EXPIRED_EVENT,
  SESSION_EXPIRED_EVENT_DETAIL,
} from '@/utils/consts.util';

const ENV = process.env.NODE_ENV;

const LOGIN = config.API_LOGIN;
const PASSWORD = config.API_PASSWORD;
const BASE_URL = config.API_BASE_URL;
const API_TIMEOUT = config.API_TIMEOUT;
const DEFAULT_LANGUAGE = config.DEFAULT_LANGUAGE;

const getTokenCache = (): TokenCache | null => {
  const token = sessionStorage.getItem(APP_TOKEN);
  const expiresAt = sessionStorage.getItem(APP_TOKEN_EXP);

  if (token && expiresAt) {
    return { token, expiresAt: parseInt(expiresAt, 10) };
  }

  return null;
};

const setTokenCache = (token: string, expiresAt: number): void => {
  sessionStorage.setItem(APP_TOKEN, token);
  sessionStorage.setItem(APP_TOKEN_EXP, expiresAt.toString());
};

// Verifica se o token é válido
const isTokenValid = (cache: TokenCache): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return cache.expiresAt > now + 60; // Buffer de 60s
};

// Autentica e obtém um novo token, se necessário
const authenticate = async (): Promise<string> => {
  const cache = getTokenCache();

  if (cache && isTokenValid(cache)) return cache.token;

  const response = await fetch(`${BASE_URL}/v1/api/generate-token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-lang': DEFAULT_LANGUAGE,
    },
    body: JSON.stringify({
      login: LOGIN,
      password: PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error('Error: Authentication failed');
  }

  const data = await response.json();

  if (!data) {
    throw new Error('Error: No data found in response');
  }

  const errors: Array<ErrorObject> = data?.errors?.items;

  if (errors && errors.length > 0) {
    throw new Error(
      `API errors: ${errors.map((e: ErrorObject) => e.message).join('\n ')}`
    );
  }

  const token = data?.body?.token;

  if (!token) {
    throw new Error('Error: Token not found in response');
  }

  const decoded: DecodedJWT = jwtDecode(token);

  setTokenCache(token, decoded.exp);

  return token;
};

const apiInstance = async <T,>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const token = await authenticate();

  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-lang': DEFAULT_LANGUAGE,
    ...(ENV === 'development' && {
      Session: sessionStorage.getItem(SESSION_STATE) ?? '',
    }),
    ...(options.headers || {}),
  });

  let body = undefined;

  const hasFile = Object.values(options.body ?? {}).some(
    (value) => value instanceof File
  );

  if (hasFile) {
    const formData = new FormData();

    Object.entries(options?.body ?? {}).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    body = formData;
    headers.delete('Content-Type');
  } else {
    if (options.body && typeof options.body === 'object') {
      body = JSON.stringify(options.body);
    } else if (options.body && typeof options.body === 'string') {
      body = options.body;
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT);

  const url = `${BASE_URL}/${endpoint.split('/').filter(Boolean).join('/')}`;

  try {
    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body,
      signal: controller.signal,
    });

    if (res.status === 401) {
      sessionStorage.removeItem(APP_TOKEN);
      sessionStorage.removeItem(APP_TOKEN_EXP);
    } else if (res.status === 403) {
      sessionStorage.removeItem(SESSION_STATE);

      window.dispatchEvent(
        new CustomEvent(SESSION_EXPIRED_EVENT, {
          detail: SESSION_EXPIRED_EVENT_DETAIL,
        })
      );
    }

    const data = await res.json();

    if (!data) {
      const clientNoDataError: ErrorObject = {
        id: uuidv4(),
        code: res.status,
        errorType: 'ClientNoDataError',
        message: 'No data found in response',
      };

      throw new Error(JSON.stringify(Array(clientNoDataError)));
    }

    const errors: Array<ErrorObject> = data?.errors?.items;

    if (errors && errors.length > 0) {
      throw new Error(
        JSON.stringify(errors.map((e) => ({ ...e, code: res.status })))
      );
    }

    return data.body;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name.toLowerCase() === 'aborterror') {
        const clientTimeoutError: ErrorObject = {
          id: uuidv4(),
          code: 408,
          errorType: 'ClientTimeoutError',
          message: 'Request timed out',
        };

        throw new Error(JSON.stringify(Array(clientTimeoutError)));
      } else {
        throw new Error(error.message);
      }
    }

    const clientUnknownError: ErrorObject = {
      id: uuidv4(),
      code: 500,
      errorType: 'ClientUnknownError',
      message: `An unknown error occurred: ${String(error)}`,
    };

    throw new Error(JSON.stringify(Array(clientUnknownError)));
  } finally {
    clearTimeout(timer);
  }
};

export default apiInstance;
