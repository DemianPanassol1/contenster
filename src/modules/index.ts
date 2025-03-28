import { RouterModule } from '@nestjs/core';

// common
import { ApiModule } from './common/api/api.module';
import { CronJobModule } from './common/cronjob/cronjon.module';

// contenster
import { AuthModule } from './contenster/auth/auth.module';
import { RolesModule } from './contenster/roles/roles.module';
import { UsersModule } from './contenster/users/users.module';
import { AdminModule } from './contenster/admin/admin.module';
import { OptionModule } from './contenster/option/option.module';
import { ModulesModule } from './contenster/modules/modules.module';
import { PermissionsModule } from './contenster/permissions/permissions.module';
import { EmailSettingModule } from './contenster/emailSetting/emailSetting.module';
import { EstablishmentsModule } from './contenster/establishments/establishments.module';
import { FunctionalitiesModule } from './contenster/functionalities/functionalities.module';

// portfolio
import { MessagesModule } from './portfolio/messages/messages.module';

export default [
  // common
  ApiModule,
  CronJobModule,

  // contenster
  ApiModule,
  AuthModule,
  AdminModule,
  RolesModule,
  OptionModule,
  UsersModule,
  ModulesModule,
  PermissionsModule,
  EmailSettingModule,
  EstablishmentsModule,
  FunctionalitiesModule,

  // portfolio
  MessagesModule,

  RouterModule.register([
    {
      path: 'api',
      module: ApiModule,
      children: [
        {
          path: 'portfolio',
          module: null,
          children: [
            {
              path: 'messages',
              module: MessagesModule,
            },
          ],
        },
        {
          path: 'contenster',
          module: null,
          children: [
            {
              path: 'auth',
              module: AuthModule,
            },
            {
              path: 'admin',
              module: AdminModule,
              children: [
                {
                  path: 'roles',
                  module: RolesModule,
                },
                {
                  path: 'option',
                  module: OptionModule,
                },
                {
                  path: 'users',
                  module: UsersModule,
                },
                {
                  path: 'modules',
                  module: ModulesModule,
                },
                {
                  path: 'permissions',
                  module: PermissionsModule,
                },
                {
                  path: 'establishments',
                  module: EstablishmentsModule,
                },
                {
                  path: 'functionalities',
                  module: FunctionalitiesModule,
                },
                {
                  path: 'email-setting',
                  module: EmailSettingModule,
                },
              ],
            },
          ],
        },
      ],
    },
  ]),
];
