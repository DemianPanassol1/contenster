/* Falta implementar na API */
export const GET_ESTABLISHMENT_OPTIONS = (
  optional: boolean,
  userId: string = '',
  roleId: string = ''
) =>
  `/v1/api/admin/option/get-establishment-options?userId=${userId}&roleId=${roleId}&optional=${optional}`;

/* Falta implementar na API */
export const GET_PERMISSION_OPTIONS = (
  optional: boolean,
  userId: string = '',
  roleId: string = '',
  establishmentId: string = ''
) =>
  `/v1/api/admin/option/get-permission-options?userId=${userId}&roleId=${roleId}&establishmentId=${establishmentId}&optional=${optional}`;

export const GET_MODULE_OPTIONS = `/v1/api/admin/option/get-module-options`;

export const GET_ROLE_OPTIONS = `/v1/api/admin/option/get-role-options`;

export const GET_PERMISSION_BY_FUNCTIONALITY_OPTIONS = (
  optional: boolean,
  roleId: string = '',
  functionalityId: string = '',
  establishmentId: string = ''
) =>
  `/v1/api/admin/option/get-permission-by-functionality-options?roleId=${roleId}&functionalityId=${functionalityId}&establishmentId=${establishmentId}&optional=${optional}`;
