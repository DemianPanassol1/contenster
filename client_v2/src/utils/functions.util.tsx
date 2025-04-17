/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseFormSetValue } from 'react-hook-form';

import { HOMEPAGE_STATE, SESSION_STATE } from '@/utils/consts.util';

const formatStringToMask = (string: string, mask: string): string => {
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

const handlePopulateFields = (
  setFields: UseFormSetValue<any>,
  fields: Record<string, unknown>,
  content: Record<string, unknown>
): void => {
  const populate = (fieldKey: string, value: unknown) => {
    setFields(fieldKey, value, { shouldValidate: true });
  };

  const populateFields = (
    fields: Record<string, unknown>,
    content: Record<string, unknown>,
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
          populateFields(
            fields[key] as Record<string, unknown>,
            content[key] as Record<string, unknown>,
            fieldKey
          );
        } else {
          if (typeof content[key] === 'boolean') {
            populate(fieldKey, content[key]);
          } else if (
            Array.isArray(content[key]) ||
            typeof content[key] === 'object'
          ) {
            populate(fieldKey, content[key]);
          } else {
            populate(fieldKey, (content[key] ?? '').toString());
          }
        }
      }
    });
  };

  populateFields(fields, content);
};

const buildReqFilter = ({
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

const setSession = (session: Session): void => {
  sessionStorage.setItem(SESSION_STATE, JSON.stringify(session));
};

const setHomePage = (homePage: HomePage): void => {
  sessionStorage.setItem(HOMEPAGE_STATE, JSON.stringify(homePage));
};

export {
  setSession,
  setHomePage,
  buildReqFilter,
  formatStringToMask,
  handlePopulateFields,
};
