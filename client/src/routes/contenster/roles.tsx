export const PUT_ROLES = '/v1/api/admin/web-roles/put-role';

export const POST_ROLES = '/v1/api/admin/roles/post-role';

export const DELETE_ROLES = '/v1/api/admin/roles/delete-role';

export const GET_ROLES_LIST = '/v1/api/admin/roles/get-roles-list';

export const GET_ROLES = (id: string) => `/v1/api/admin/roles/get-role?id=${id}`;
