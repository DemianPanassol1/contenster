export enum PermissionType {
  general = 'general',
  establishment = 'establishment',
}

export enum DocumentType {
  cpf = 'cpf',
  cnpj = 'cnpj',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FieldType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
}

export enum Operation {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  BETWEEN = 'BETWEEN',
  NOT_BETWEEN = 'NOT_BETWEEN',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT_LIKE',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
}

export enum LoglevelType {
  info = 'info',
  warning = 'warning',
  error = 'error',
  fatal = 'fatal',
}

export enum EmailPurpose {
  RESET_PASSWORD = 'reset-password',
  VERIFY_EMAIL = 'verify-email',
  CONTACT = 'contact',
  WELCOME = 'welcome',
}
