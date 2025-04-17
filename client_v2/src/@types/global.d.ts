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

interface GlobalState {
  loading: boolean;
  theme: Theme;
  drawerState: boolean;
  dialogState: boolean;
}

interface GlobalSubmitProps {
  type: HTTPMethod & 'POST/FILE';
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
  toggleDialog: () => void;
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
