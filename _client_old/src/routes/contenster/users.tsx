export const GET_USERS_LIST = '/v1/api/contenster/admin/users/get-users-list';

export const GET_USER = (id: string, establishmentId: string) =>
  `/v1/api/contenster/admin/users/get-user?id=${id}&establishmentId=${establishmentId}`;

export const PUT_USER = '/v1/api/contenster/admin/users/put-user';

export const DELETE_USER = '/v1/api/contenster/admin/users/delete-user';

export const POST_USER = '/v1/api/contenster/admin/users/post-user';
