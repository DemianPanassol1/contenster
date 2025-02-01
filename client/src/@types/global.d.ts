declare interface HomePage {
  redirect: boolean;
  homePage: string;
}

declare interface Session {
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

declare interface Establishment {
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

declare interface Permission {
  id: number;
  slug: string;
  title: string | null;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

declare interface PageKey {
  key1: number;
  key2: number;
  key3: number;
}

declare interface RouteParams {
  id: string | null;
  type: string | null;
  slug: string | null;
}

declare interface ToastOptions {
  anchorOrigin: {
    horizontal: 'right' | 'left' | 'center';
    vertical: 'top' | 'bottom';
  };
  action: (snackId: string | number) => JSX.Element;
}
