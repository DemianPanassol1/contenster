type ColumnType =
  | 'text'
  | 'date'
  | 'datetime'
  | 'time'
  | 'currency'
  | 'icon'
  | 'checkbox'
  | 'image';
type Theme = 'light' | 'dark';
type DocumentType = 'cpf' | 'cnpj';
type PermissionType = 'general' | 'establishment';
type CustomHTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'POST/FILE';
type LanguagesCode = 'pt' | 'en' | 'es';

interface GlobalState {
  loading: boolean;
  theme: Theme;
  drawerState: boolean;
  dialogState: boolean | string;
}

interface GlobalSubmitProps {
  type: CustomHTTPMethod;
  endpoint: string;
  body?: object;
  message?: string | boolean;
  onSuccess?: (response?: unknown) => void;
  onError?: (error?: unknown) => void;
}

interface GlobalContextProps {
  state: GlobalState;
  toggleLoading: () => void;
  toggleTheme: () => void;
  toggleDrawer: () => void;
  toggleDialog: (dialog: string | null) => void;
  handleOnSubmit: (props: GlobalSubmitProps) => void;
}

interface Columns {
  name: string;
  field: string;
  selector: string;
  sortable: boolean;
  searchable: boolean;
  type: ColumnType;
  mask?: string;
  width?: string;
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
  permissions: Array<Permission>;
  establishment: Establishment;
}

interface Establishment {
  id: number;
  document: string;
  documentType: DocumentType;
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
  slug: string;
}

interface Permission {
  id: number;
  slug: string;
  title: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  type: PermissionType;
}

interface HomePage {
  redirect: boolean;
  homePage: string;
}

interface UploadedFile {
  id: number;
  size: string;
  width: string;
  height: string;
  newName: string;
  mimeType: string;
  originalName: string;
  filePath: string;
}

interface Language {
  id: number;
  code: string;
  name: string;
  icon: string;
}

interface Functionalities {
  id: number;
  slug: string;
  title: string;
  icon: string;
  position: number;
  moduleId: number;
  permissions: {
    id: number;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    type: PermissionType;
  };
}

interface ModuleList {
  id: number;
  title: string;
  positon: number;
  functionalities: Array<Functionalities>;
}

interface SelectOption {
  value: string;
  label: string;
}

interface DataTable {
  data: Array<{
    id: number;
    [key: string]: unknown;
  }>;
  meta: {
    hasNextPage: boolean;
    optional: boolean;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    filters: Array<Filter>;
    sortBy: Array<SortBy>;
  };
}
