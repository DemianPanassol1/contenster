export default {
  MESSAGES: {
    GET_MESSAGES_LIST: '/v1/api/portfolio/messages/admin/get-messages-list',
    GET_MESSAGE: (id: string) =>
      `/v1/api/portfolio/messages/admin/get-message?id=${id}`,
    PUT_MESSAGE: '/v1/api/portfolio/messages/admin/put-message',
    DELETE_MESSAGE: '/v1/api/portfolio/messages/admin/delete-message',
    POST_MESSAGE: '/v1/api/portfolio/messages/admin/post-message',
  },
};
