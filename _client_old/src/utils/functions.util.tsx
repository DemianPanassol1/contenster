import some from 'lodash/some';
import filter from 'lodash/filter';
import { UseFormSetValue } from 'react-hook-form';

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

/**
 * Populates fields with values from a given content object, including nested properties.
 *
 * @param setFields - A function to set the field values.
 * @param fields - An object representing the fields to be populated.
 * @param content - An object containing the values to populate the fields with.
 */
export const handlePopulateFields = (
  setFields: UseFormSetValue<any>,
  fields: Record<string, any>,
  content: Record<string, any>
): void => {
  const populate = (fieldKey: string, value: unknown) => {
    setFields(fieldKey, value, { shouldValidate: true });
  };

  const populateFields = (
    fields: Record<string, any>,
    content: Record<string, any>,
    parentKey = ''
  ) => {
    Object.keys(content).forEach((key) => {
      const fieldKey = parentKey ? `${parentKey}.${key}` : key;

      if (fields.hasOwnProperty(key)) {
        if (
          content[key] !== null &&
          typeof content[key] === 'object' &&
          !Array.isArray(content[key])
        ) {
          populateFields(fields[key], content[key], fieldKey);
        } else {
          if (typeof content[key] === 'boolean') {
            populate(fieldKey, content[key]);
          } else if (Array.isArray(content[key]) || typeof content[key] === 'object') {
            populate(fieldKey, content[key]);
          } else {
            populate(fieldKey, content[key].toString());
          }
        }
      }
    });
  };

  populateFields(fields, content);
};

export const buildReqFilter = ({
  pageSize = Number.MAX_SAFE_INTEGER,
  pageNumber = 1,
  optional = false,
  customFields = {},
  sortBy = [],
  filters = [],
}: {
  pageSize?: number;
  pageNumber?: number;
  optional?: boolean;
  customFields?: Record<string, string | null>;
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

/**
 * Parses a string by normalizing and converting it to lowercase.
 *
 * @param value - The input string to be parsed.
 * @returns The parsed string.
 */
export const parseString = (value: string): string => {
  let normalizedString = value;

  if (!normalizedString) return '';

  normalizedString = normalizedString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return normalizedString.toLowerCase().trim();
};

/**
 * Filters an array of data objects based on specified fields and a search term.
 *
 * @param data - The array of data objects to filter.
 * @param fields - The fields to search within each data object.
 * @param searchTerm - The term to search for within the specified fields.
 * @returns  The filtered array of data objects.
 */
export const filterDataByField = (
  data: Record<string, any>,
  fields: string[],
  searchTerm: string
) => {
  let fieldArray = fields;

  if (!Array.isArray(fields)) {
    fieldArray = [fields];
  }

  return filter(data, (item) => {
    return fieldArray.some((f) => {
      if (typeof item[f] === 'object') {
        return some(
          Object.values(item[f]),
          (value) => typeof value === 'string' && value.includes(searchTerm)
        );
      }

      if (typeof item[f] === 'string') {
        return item[f].includes(searchTerm);
      }
      return false;
    });
  });
};

/**
 * Generates a unique identifier string.
 *
 * @param {string} [prefix='id'] - The prefix to be added to the unique identifier.
 * @returns {string} A unique identifier string composed of the prefix, current timestamp, and a random number.
 */
export const generateUniqueId = (prefix: string = 'id'): string => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const timestamp = new Date().getTime();
  return `${prefix}_${timestamp}_${randomNumber}`;
};
