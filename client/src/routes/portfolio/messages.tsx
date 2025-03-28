export const GET_MESSAGES_LIST = '/v1/api/portfolio/admin/users/get-messages-list';

export const GET_MESSAGE = (id: string) =>
  `/v1/api/portfolio/admin/messages/get-user?id=${id}`;

export const PUT_MESSAGE = '/v1/api/portfolio/admin/messages/put-message';

export const DELETE_MESSAGE = '/v1/api/portfolio/admin/messages/delete-message';

export const POST_MESSAGE = '/v1/api/portfolio/admin/messages/post-message';
