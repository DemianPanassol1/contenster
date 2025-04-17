import apiInstance from './instance.service';

import {
  ERRORS_STATE,
  LOADING_STATE,
  LOADING_STATE_CHANGED_EVENT,
} from '@/utils/consts.util';

const dispatchLoadingStateEvent = (state: boolean) => {
  sessionStorage.setItem(LOADING_STATE, JSON.stringify(state));

  window.dispatchEvent(
    new CustomEvent(LOADING_STATE_CHANGED_EVENT, {
      detail: 'Loading state changed',
    })
  );
};

const dispathchErrorStateEvent = (error: string) => {
  sessionStorage.setItem(ERRORS_STATE, error);

  window.dispatchEvent(
    new CustomEvent('errorStateChanged', {
      detail: 'Error state changed',
    })
  );
};

const handleGetRequest = async <T,>(endpoint: string) => {
  try {
    dispatchLoadingStateEvent(true);

    const response = await apiInstance<T>(endpoint, {
      method: 'GET',
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispathchErrorStateEvent(error.message);
  } finally {
    dispatchLoadingStateEvent(false);
  }
};

const handlePostRequest = async <T,>(
  endpoint: string,
  body: object,
  headers?: Record<string, string>
) => {
  try {
    dispatchLoadingStateEvent(true);

    const response = await apiInstance<T>(endpoint, {
      method: 'POST',
      body,
      headers,
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispathchErrorStateEvent(error.message);
  } finally {
    dispatchLoadingStateEvent(false);
  }
};

const handlePutRequest = async <T,>(
  endpoint: string,
  body: object,
  headers?: Record<string, string>
) => {
  try {
    dispatchLoadingStateEvent(true);

    const response = await apiInstance<T>(endpoint, {
      method: 'PUT',
      body,
      headers,
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispathchErrorStateEvent(error.message);
  } finally {
    dispatchLoadingStateEvent(false);
  }
};

const handleDeleteRequest = async <T,>(endpoint: string) => {
  try {
    dispatchLoadingStateEvent(true);

    const response = await apiInstance<T>(endpoint, {
      method: 'DELETE',
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispathchErrorStateEvent(error.message);
  } finally {
    dispatchLoadingStateEvent(false);
  }
};

export {
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
  handleDeleteRequest,
};
