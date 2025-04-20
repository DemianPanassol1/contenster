export const SIGN_IN = '/v1/api/contenster/auth/sign-in';

export const AUTHORIZE = '/v1/api/contenster/auth/authorize';

export const SIGN_OUT = '/v1/api/contenster/auth/sign-out';

export const POST_RESET_PASSWORD = '/v1/api/contenster/auth/reset-password';

export const POST_CREATE_PASSWORD = '/v1/api/contenster/auth/create-password';

export const GET_MODULES_LIST = '/v1/api/contenster/admin/get-modules-list';

export const GET_SYNC_USER = '/v1/api/contenster/admin/get-sync-user';

export const PUT_RESET_PASSWORD = '/v1/api/contenster/admin/put-reset-password';

export const POST_CHANGE_USER_ESTABLISHMENT =
  '/v1/api/contenster/admin/post-change-user-establishment';

export const GET_CONFIG_INFO = '/v1/api/contenster/auth/get-config-info';

export const UPLOAD_FILE = '/v1/api/contenster/admin/upload-file';

export const GET_FILE_BY_ID = (id: string) =>
  `/v1/api/contenster/admin/get-file-by-id?id=${id}`;

export const GET_ICON_LIST = '/v1/api/contenster/admin/get-icons-list';
