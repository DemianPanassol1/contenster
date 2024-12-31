import { Expose, Type } from 'class-transformer';

class RoleDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;
}

class PermissionDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  canRead: boolean;

  @Expose()
  canCreate: boolean;

  @Expose()
  canUpdate: boolean;

  @Expose()
  canDelete: boolean;
}

class CompanyDto {
  @Expose()
  id: number;

  @Expose()
  document: string;

  @Expose()
  documentType: string;

  @Expose()
  email: string;

  @Expose()
  phone1: string;

  @Expose()
  phone2: string | null;

  @Expose()
  address: string;

  @Expose()
  addressNumber: string;

  @Expose()
  zipCode: string;

  @Expose()
  district: string;

  @Expose()
  corporateName: string;

  @Expose()
  fantasyName: string;

  @Expose()
  image: string | null;
}

export class PostSignInResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  image: string | null;

  @Expose()
  username: string;

  @Expose()
  isActive: boolean;

  @Expose()
  phone: string;

  @Expose()
  homePage: string | null;

  @Expose()
  establishmentCount: number;

  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;

  @Expose()
  @Type(() => PermissionDto)
  permissions: PermissionDto[];

  @Expose()
  @Type(() => CompanyDto)
  company: CompanyDto;
}
