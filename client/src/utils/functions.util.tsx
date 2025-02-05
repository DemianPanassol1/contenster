/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequest } from '../settings/services.setting';

/**
 * Fetch data using GET method.
 *
 * @param url - The endpoint URL.
 * @returns The response object containing success, body, and errors.
 */
export const fetchGET = async (url: string) => {
  const res = await ApiRequest('get', url);

  return {
    success: res?.data?.statusCode === 200,
    body: res?.data?.body ?? null,
    errors: res?.data?.errors ?? { count: 0, items: [] },
  };
};

/**
 * Fetch data using POST method.
 *
 * @param url - The endpoint URL.
 * @param data - The payload to send in the request.
 * @returns The response object containing success, body, and errors.
 */
export const fetchPOST = async (url: string, data: Record<string, any>) => {
  const res = await ApiRequest('post', url, data);

  return {
    success: res?.data?.statusCode === 200,
    body: res?.data?.body ?? null,
    errors: res?.data?.errors ?? { count: 0, items: [] },
  };
};

/**
 * Fetch data using PUT method.
 *
 * @param url - The endpoint URL.
 * @param data - The payload to send in the request.
 * @returns The response object containing success, body, and errors.
 */
export const fetchPUT = async (url: string, data: Record<string, any>) => {
  const res = await ApiRequest('put', url, data);

  return {
    success: res?.data?.statusCode === 200,
    body: res?.data?.body ?? null,
    errors: res?.data?.errors ?? { count: 0, items: [] },
  };
};

/**
 * Fetch data using DELETE method.
 *
 * @param url - The endpoint URL.
 * @returns The response object containing success, body, and errors.
 */
export const fetchDELETE = async (url: string) => {
  const res = await ApiRequest('delete', url);

  return {
    success: res?.data?.statusCode === 200,
    body: res?.data?.body ?? null,
    errors: res?.data?.errors ?? { count: 0, items: [] },
  };
};

/**
 * Fetch a file using POST method with multipart/form-data.
 *
 * @param url - The endpoint URL.
 * @param data - The payload to send in the request.
 * @returns The response object containing success, body, and errors.
 */
export const fetchFILE = async (url: string, data: Record<string, any>) => {
  const res = await ApiRequest('post', url, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return {
    success: res?.data?.statusCode === 200,
    body: res?.data?.body ?? null,
    errors: res?.data?.errors ?? { count: 0, items: [] },
  };
};

/**
 * Formats a string according to a given mask.
 *
 * @param string - The input string to be formatted.
 * @param mask - The mask to format the string. Use `#` as a placeholder.
 * @returns The formatted string or the original input if invalid.
 */
export const formatStringToMask = (string: string, mask: string): string => {
  if (!mask || !string) return string;

  let formattedString = '';
  let index = 0;

  // Replace non-alphanumeric characters in the mask with '#'
  mask = mask.replace(/[^a-zA-Z0-9\-\/\.]/g, '#');

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '#') {
      if (index < string.length) {
        formattedString += string[index];
        index++;
      } else {
        break;
      }
    } else {
      formattedString += mask[i];
    }
  }

  return formattedString;
};

type SetFieldsFunction = (
  field: string,
  value: any,
  options?: { shouldValidate?: boolean }
) => void;

/**
 * Populates fields with values from a given content object.
 *
 * @param setFields - A function to set the field values.
 * @param fields - An object representing the fields to be populated.
 * @param content - An object containing the values to populate the fields with.
 */
export const handlePopulateFields = (
  setFields: SetFieldsFunction,
  fields: Record<string, any>,
  content: Record<string, any>
): void => {
  const fieldsArray = Object.keys(fields);

  Object.keys(content).forEach((key) => {
    if (fieldsArray.includes(key)) {
      if (content[key] !== null) {
        setFields(key, content[key], { shouldValidate: true });
      }
    }
  });
};

export const buildReqFilter = ({
  pageSize = 0,
  pageNumber = Number.MAX_SAFE_INTEGER,
  optional = false,
  customFields = {},
  sortBy = [],
  filters = [],
}: {
  pageSize?: number;
  pageNumber?: number;
  optional?: boolean;
  customFields?: Record<string, string>;
  sortBy?: SortBy[];
  filters?: Filter[];
}) => {
  return {
    sortBy,
    filters,
    optional,
    pageSize,
    pageNumber,
    ...customFields,
  };
};
