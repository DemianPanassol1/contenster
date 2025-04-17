type AcceptedFileTypes =
  | 'image/*'
  | 'video/*'
  | 'audio/*'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'text/plain'
  | 'text/csv'
  | 'application/zip'
  | 'application/x-rar-compressed'
  | 'application/json'
  | 'application/xml'
  | 'application/x-tar'
  | 'application/x-7z-compressed'
  | '*/*'
  | '';

type Operation =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'GREATER_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'LESS_THAN'
  | 'LESS_THAN_OR_EQUAL'
  | 'IN'
  | 'NOT_IN'
  | 'BETWEEN'
  | 'NOT_BETWEEN'
  | 'LIKE'
  | 'NOT_LIKE'
  | 'IS_NULL'
  | 'IS_NOT_NULL';
type Order = 'ASC' | 'DESC';
type Type = 'STRING' | 'NUMBER' | 'DATE';
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface DecodedJWT {
  exp: number;
  [key: string]: unknown;
}

interface FetchOptions {
  method?: HTTPMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

interface ErrorObject {
  id: string;
  code: number;
  message: string;
  errorType: string;
}

interface SortBy {
  order: Order;
  field: string;
}
interface Filter {
  field: string;
  value: string;
  disjunctive: boolean;
  type: Type;
  operation: Operation;
}
