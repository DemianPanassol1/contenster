export const PUT_ESTABLISHMENT = '/v1/api/contenster/admin/establishments/put-establishment';

export const POST_ESTABLISHMENT = '/v1/api/contenster/admin/establishments/post-establishment';

export const DELETE_ESTABLISHMENT = '/v1/api/contenster/admin/establishments/delete-establishment';

export const GET_ESTABLISHMENTS_LIST =
  '/v1/api/contenster/admin/establishments/get-establishments-list';

export const GET_ESTABLISHMENT = (id: string) =>
  `/v1/api/contenster/admin/establishments/get-establishment?id=${id}`;
