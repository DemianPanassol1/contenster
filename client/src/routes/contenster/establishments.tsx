export const PUT_ESTABLISHMENTS = '/v1/api/admin/establishments/put-establishments';

export const POST_ESTABLISHMENTS = '/v1/api/admin/establishments/post-establishments';

export const DELETE_ESTABLISHMENTS = '/v1/api/admin/establishments/delete-establishments';

export const GET_ESTABLISHMENTS_LIST =
  '/v1/api/admin/establishments/get-establishments-list';

export const GET_ESTABLISHMENTS = (id: string) =>
  `/v1/api/admin/establishments/get-establishments?id=${id}`;
