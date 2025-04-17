import apiInstance from '@/services/instance.service';

import {
  ERRORS_STATE,
  LOADING_STATE,
  ERROR_STATE_CHANGED_EVENT,
  LOADING_STATE_CHANGED_EVENT,
  ERROR_STATE_CHANGED_EVENT_DETAIL,
  LOADING_STATE_CHANGED_EVENT_DETAIL,
} from '@/utils/consts.util';

const dispatchLoadingStateEvent = (state: boolean) => {
  sessionStorage.setItem(LOADING_STATE, JSON.stringify(state));

  window.dispatchEvent(
    new CustomEvent(LOADING_STATE_CHANGED_EVENT, {
      detail: LOADING_STATE_CHANGED_EVENT_DETAIL,
    })
  );
};

const dispathchErrorStateEvent = (error: string) => {
  sessionStorage.setItem(ERRORS_STATE, error);

  window.dispatchEvent(
    new CustomEvent(ERROR_STATE_CHANGED_EVENT, {
      detail: ERROR_STATE_CHANGED_EVENT_DETAIL,
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispathchErrorStateEvent(error.message);
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispathchErrorStateEvent(error.message);
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispathchErrorStateEvent(error.message);
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispathchErrorStateEvent(error.message);
    }
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
