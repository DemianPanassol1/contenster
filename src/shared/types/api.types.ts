import { PermissionType } from 'src/entities/contensterdb/permission.entity';

export interface ErrorItem {
  id: string;
  message: string;
  errorType: string;
}

export interface ResponseFormat<T = null> {
  lang: string;
  requestId: string;
  statusCode: number;
  status: string;
  body: T;
  errors: {
    count: number;
    items: ErrorItem[];
  };
  datetime: string;
  requestTime: string;
}

export interface IToOptions {
  value: string;
  label: string;
}

export interface ICurrentUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: string;
  isActive: boolean;
  username: string;
  homePage: string;
  establishmentCount: number;
  role: {
    id: number;
    title: string;
    description: string;
  };
  establishment: IEstablishmentInfo;
  permissions: IPermissions[];
}

export interface IPermissions {
  id: number;
  title: string;
  slug: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  type: PermissionType;
}

export interface IEstablishmentInfo {
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
  slug: string;
}
