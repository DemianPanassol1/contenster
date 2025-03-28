export const PUT_EMAIL_SETTING = '/v1/api/contenster/admin/email-setting/put-email-setting';

export const POST_EMAIL_SETTING = '/v1/api/contenster/admin/email-setting/post-email-setting';

export const DELETE_EMAIL_SETTING = '/v1/api/contenster/admin/email-setting/delete-email-setting';

export const GET_EMAIL_SETTING_LIST =
  '/v1/api/contenster/admin/email-setting/get-email-setting-list';

export const GET_EMAIL_SETTING = (id: string) =>
  `/v1/api/contenster/admin/email-setting/get-email-setting?id=${id}`;
