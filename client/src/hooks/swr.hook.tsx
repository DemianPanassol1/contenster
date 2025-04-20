import useSWR, { useSWRConfig } from 'swr';

import apiInstance from '@/services/instance.service';

const useGET = <T,>(
  url: string,
  revalidate: boolean = false
): UseGETResponse<T> => {
  const { mutate } = useSWRConfig();

  const fetcher = (endpoint: string) =>
    apiInstance<T>(endpoint, { method: 'GET' });

  const { data, error, isLoading } = useSWR<T>(url, fetcher, {
    keepPreviousData: true,
    revalidateOnMount: true,
    revalidateIfStale: revalidate,
    revalidateOnFocus: revalidate,
    revalidateOnReconnect: revalidate,
  });

  return {
    data,
    isLoading: Boolean(isLoading || error),
    refresh: async (key?: string) => mutate(key || url),
  };
};

const usePOST = <T,>(
  url: string,
  body: object,
  revalidate: boolean = false
): UsePOSTResponse<T> => {
  const { mutate } = useSWRConfig();

  const fetcher = (endpoint: string, payload: object) =>
    apiInstance<T>(endpoint, { method: 'POST', body: payload });

  const { data, error, isLoading } = useSWR(
    [url, body],
    ([url, data]) => fetcher(url, data),
    {
      keepPreviousData: true,
      revalidateOnMount: true,
      revalidateIfStale: revalidate,
      revalidateOnFocus: revalidate,
      revalidateOnReconnect: revalidate,
    }
  );

  return {
    data,
    isLoading: Boolean(isLoading || error),
    refresh: async (key?: string, payload?: object) => {
      if (key && payload) {
        return mutate([key, payload]);
      } else if (key) {
        return mutate(key);
      } else if (payload) {
        return mutate([url, payload]);
      }
      return mutate([url, body]);
    },
  };
};

export { useGET, usePOST };
