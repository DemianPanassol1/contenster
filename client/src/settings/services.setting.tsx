/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance, AxiosResponse } from 'axios';

import config from '../config/settings.json';

const ENV = process.env.NODE_ENV;
const LOGIN = config.API_LOGIN;
const PASSWORD = config.API_PASSWORD;
const BASE_URL = config.API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-lang': localStorage.getItem('i18nextLng') ?? config.DEFAULT_LANGUAGE,
  },
  validateStatus: (status) => {
    return status >= 200 && status <= 500;
  },
});

const ApiLogin = async (): Promise<string> => {
  const res: AxiosResponse<{ body: { token: string } }> = await instance.post(
    '/v1/api/generate-token',
    {
      login: LOGIN,
      password: PASSWORD,
    }
  );

  return res.data.body.token;
};

const ApiTokenChecked = (): boolean => {
  const now = Date.now();
  const tenMin = 1000 * 60 * 10;
  const lastUpdated = sessionStorage.getItem('lastUpdated');

  if (lastUpdated && Number(lastUpdated) + tenMin > now) {
    return true;
  }

  sessionStorage.setItem('lastUpdated', now.toString());
  return false;
};

const HandleAuthorizationToken = async (): Promise<void> => {
  const storagedToken = sessionStorage.getItem('token');

  const tokenChecked = ApiTokenChecked();

  if (tokenChecked && storagedToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
  } else {
    const newToken = await ApiLogin();

    sessionStorage.setItem('token', newToken);

    instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  }

  if (ENV === 'development') {
    instance.defaults.headers.common.Session = sessionStorage.getItem('session');
  }
};

interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export const ApiRequest = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string = '',
  data: Record<string, any> = {},
  options: ApiRequestOptions = {}
): Promise<AxiosResponse<any>> => {
  await HandleAuthorizationToken();

  let response;
  switch (method.toLowerCase()) {
    case 'get':
      response = await instance.get(url, options);
      break;
    case 'post':
      response = await instance.post(url, data, options);
      break;
    case 'put':
      response = await instance.put(url, data, options);
      break;
    case 'delete':
      response = await instance.delete(url, options);
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  return response;
};

instance.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  if (res.status === 403) {
    sessionStorage.removeItem('session');

    window.location.replace('/auth');
  } else if (res.status === 401) {
    sessionStorage.removeItem('lastUpdated');
  }

  return res;
});
