/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */

import { UseFormSetValue } from 'react-hook-form';

import {
  SESSION_STATE,
  HOMEPAGE_STATE,
  SESSION_EXPIRED_EVENT,
  SESSION_EXPIRED_EVENT_DETAIL,
} from '@/utils/consts.util';

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
  setFields: UseFormSetValue<any>, // eslint-disable-line
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

const setSession = (session: Session | null): void => {
  if (!session) {
    sessionStorage.removeItem(SESSION_STATE);

    window.dispatchEvent(
      new CustomEvent(SESSION_EXPIRED_EVENT, {
        detail: SESSION_EXPIRED_EVENT_DETAIL,
      })
    );
    return;
  }
  sessionStorage.setItem(SESSION_STATE, JSON.stringify(session));
};

const setHomePage = (homePage: HomePage): void => {
  sessionStorage.setItem(HOMEPAGE_STATE, JSON.stringify(homePage));
};

const getDefaultPermission = (slug?: string): Permission => ({
  id: 0,
  slug: slug || '',
  title: '',
  canRead: true,
  canCreate: false,
  canUpdate: false,
  canDelete: false,
  type: 'general',
});

export {
  setSession,
  setHomePage,
  buildReqFilter,
  formatStringToMask,
  handlePopulateFields,
  getDefaultPermission,
};
