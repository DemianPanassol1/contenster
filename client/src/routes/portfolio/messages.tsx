export const GET_MESSAGES_LIST = '/v1/api/portfolio/messages/admin/get-messages-list';

export const GET_MESSAGE = (id: string) =>
  `/v1/api/portfolio/messages/admin/get-message?id=${id}`;

export const PUT_MESSAGE = '/v1/api/portfolio/messages/admin/put-message';

export const DELETE_MESSAGE = '/v1/api/portfolio/messages/admin/delete-message';

export const POST_MESSAGE = '/v1/api/portfolio/messages/admin/post-message';
