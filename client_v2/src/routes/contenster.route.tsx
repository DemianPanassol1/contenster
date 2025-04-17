export default {
  ESTABLISHMENT: {
    GET_ESTABLISHMENTS_LIST:
      '/v1/api/contenster/admin/establishments/get-establishments-list',
    GET_ESTABLISHMENT: (id: string) =>
      `/v1/api/contenster/admin/establishments/get-establishment?id=${id}`,
    PUT_ESTABLISHMENT:
      '/v1/api/contenster/admin/establishments/put-establishment',
    DELETE_ESTABLISHMENT:
      '/v1/api/contenster/admin/establishments/delete-establishment',
    POST_ESTABLISHMENT:
      '/v1/api/contenster/admin/establishments/post-establishment',
  },
  EMAIL_SETTINGS: {
    GET_EMAIL_SETTING_LIST:
      '/v1/api/contenster/admin/email-setting/get-email-setting-list',
    GET_EMAIL_SETTING: (id: string) =>
      `/v1/api/contenster/admin/email-setting/get-email-setting?id=${id}`,
    PUT_EMAIL_SETTING:
      '/v1/api/contenster/admin/email-setting/put-email-setting',
    DELETE_EMAIL_SETTING:
      '/v1/api/contenster/admin/email-setting/delete-email-setting',
    POST_EMAIL_SETTING:
      '/v1/api/contenster/admin/email-setting/post-email-setting',
  },
  FUNCTIONALITY: {
    GET_FUNCTIONALITIES_LIST:
      '/v1/api/contenster/admin/functionalities/get-functionalities-list',
    GET_FUNCTIONALITY: (id: string) =>
      `/v1/api/contenster/admin/functionalities/get-functionality?id=${id}`,
    PUT_FUNCTIONALITY:
      '/v1/api/contenster/admin/functionalities/put-functionality',
    DELETE_FUNCTIONALITY:
      '/v1/api/contenster/admin/functionalities/delete-functionality',
    POST_FUNCTIONALITY:
      '/v1/api/contenster/admin/functionalities/post-functionality',
  },
  GLOBAL: {
    SIGN_IN: '/v1/api/contenster/auth/sign-in',
    AUTHORIZE: '/v1/api/contenster/auth/authorize',
    SIGN_OUT: '/v1/api/contenster/auth/sign-out',
    POST_RESET_PASSWORD: '/v1/api/contenster/auth/reset-password',
    POST_CREATE_PASSWORD: '/v1/api/contenster/auth/create-password',
    GET_MODULES_LIST: '/v1/api/contenster/admin/get-modules-list',
    GET_SYNC_USER: '/v1/api/contenster/admin/get-sync-user',
    PUT_RESET_PASSWORD: '/v1/api/contenster/admin/put-reset-password',
    POST_CHANGE_USER_ESTABLISHMENT:
      '/v1/api/contenster/admin/post-change-user-establishment',
    UPLOAD_FILE: '/v1/api/contenster/admin/upload-file',
    GET_FILE_BY_ID: (id: string) =>
      `/v1/api/contenster/admin/get-file-by-id?id=${id}`,
    GET_ICON_LIST: '/v1/api/contenster/admin/get-icons-list',
  },
  MODULES: {
    GET_MODULES_LIST: '/v1/api/contenster/admin/modules/get-modules-list',
    GET_MODULE: (id: string) =>
      `/v1/api/contenster/admin/modules/get-module?id=${id}`,
    PUT_MODULE: '/v1/api/contenster/admin/modules/put-module',
    POST_MODULE: '/v1/api/contenster/admin/modules/post-module',
    DELETE_MODULE: '/v1/api/contenster/admin/modules/delete-module',
  },
  OPTIONS: {
    GET_ESTABLISHMENT_OPTIONS:
      '/v1/api/contenster/admin/option/get-establishment-options',
    GET_PERMISSION_OPTIONS:
      '/v1/api/contenster/admin/option/get-permission-options',
    GET_MODULE_OPTIONS: '/v1/api/contenster/admin/option/get-module-options',
    GET_ROLE_OPTIONS: '/v1/api/contenster/admin/option/get-role-options',
    GET_FUNCTIONALITY_OPTIONS:
      '/v1/api/contenster/admin/option/get-functionality-options',
  },
  PERMISSIONS: {
    GET_PERMISSIONS_LIST:
      '/v1/api/contenster/admin/permissions/get-permissions-list',
    GET_PERMISSION: (id: string) =>
      `/v1/api/contenster/admin/permissions/get-permission?id=${id}`,
    PUT_PERMISSION: '/v1/api/contenster/admin/permissions/put-permission',
    POST_PERMISSION: '/v1/api/contenster/admin/permissions/post-permission',
    DELETE_PERMISSION: '/v1/api/contenster/admin/permissions/delete-permission',
  },
  PROFILE: {
    GET_USER_INFO: '/v1/api/contenster/admin/get-user-info',
    PUT_USER_INFO: '/v1/api/contenster/admin/put-user-info',
  },
  ROLES: {
    GET_ROLES_LIST: '/v1/api/contenster/admin/roles/get-roles-list',
    GET_ROLE: (id: string) =>
      `/v1/api/contenster/admin/roles/get-role?id=${id}`,
    PUT_ROLE: '/v1/api/contenster/admin/roles/put-role',
    POST_ROLE: '/v1/api/contenster/admin/roles/post-role',
    DELETE_ROLE: '/v1/api/contenster/admin/roles/delete-role',
  },
  USERS: {
    GET_USERS_LIST: '/v1/api/contenster/admin/users/get-users-list',
    GET_USER: (id: string, establishmentId: string) =>
      `/v1/api/contenster/admin/users/get-user?id=${id}&establishmentId=${establishmentId}`,
    PUT_USER: '/v1/api/contenster/admin/users/put-user',
    DELETE_USER: '/v1/api/contenster/admin/users/delete-user',
    POST_USER: '/v1/api/contenster/admin/users/post-user',
  },
};
