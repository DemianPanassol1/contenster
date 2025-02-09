interface HomePage {
  redirect: boolean;
  homePage: string;
}

interface Session {
  id: number;
  name: string;
  email: string;
  image: string;
  username: string;
  isActive: boolean;
  phone: string;
  homePage: string;
  establishmentCount: number;
  role: {
    id: number;
    title: string;
    description: string;
  };
  permissions: Permission[];
  establishment: Establishment;
}

interface Establishment {
  id: number;
  document: string;
  documentType: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  addressNumber: string;
  zipCode: string;
  district: string;
  corporateName: string;
  fantasyName: string;
  image: string;
}

interface Permission {
  id: number;
  slug: string;
  title: string | null;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

interface PageKey {
  key1: number;
  key2: number;
  key3: number;
}

interface RouteParams {
  id: string | null;
  type: string | null;
  slug: string | null;
}

interface ToastOptions {
  anchorOrigin: {
    horizontal: 'right' | 'left' | 'center';
    vertical: 'top' | 'bottom';
  };
  action: (snackId: string | number) => JSX.Element;
}

interface SelectOption {
  value: string;
  label: string;
}

interface GlobalState {
  mode: 'light' | 'dark';
  theme: Theme;
  loading: boolean;
  drawerState: boolean;
  dialogState: string | boolean;
  configInfo: Configuration | null;
  i18nextLng: Language['code'];
}

interface Configuration {
  id: number;
  favicon: string;
  loginLogo: string;
  loginBanner: string;
  languages: Language[];
}

interface Language {
  id: number;
  name: string;
  purpose: 'both' | 'console' | 'site' | 'none';
  code: 'pt' | 'en' | 'es';
  icon: string;
  default: boolean;
}

interface SortBy {
  order: 'ASC' | 'DESC';
  field: string;
}
interface Filter {
  field: string;
  value: string;
  disjunctive: boolean;
  type: 'STRING' | 'NUMBER' | 'DATE';
  operation:
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
}

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
