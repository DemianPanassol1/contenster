export const PUT_ROLE = '/v1/api/contenster/admin/roles/put-role';

export const POST_ROLE = '/v1/api/contenster/admin/roles/post-role';

export const DELETE_ROLE = '/v1/api/contenster/admin/roles/delete-role';

export const GET_ROLES_LIST = '/v1/api/contenster/admin/roles/get-roles-list';

export const GET_ROLE = (id: string) =>
  `/v1/api/contenster/admin/roles/get-role?id=${id}`;
