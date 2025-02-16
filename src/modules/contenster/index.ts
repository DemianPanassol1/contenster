import { RouterModule } from '@nestjs/core';

import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { OptionModule } from './option/option.module';
import { ModulesModule } from './modules/modules.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';

export default [
  ApiModule,
  AdminModule,
  AuthModule,
  OptionModule,
  RolesModule,
  FunctionalitiesModule,
  PermissionsModule,
  EstablishmentsModule,
  ModulesModule,
  UsersModule,
  RouterModule.register([
    {
      path: 'api',
      module: ApiModule,
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
              path: 'option',
              module: OptionModule,
            },
            {
              path: 'roles',
              module: RolesModule,
            },
            {
              path: 'functionalities',
              module: FunctionalitiesModule,
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
              path: 'modules',
              module: ModulesModule,
            },
            {
              path: 'users',
              module: UsersModule,
            },
          ],
        },
      ],
    },
  ]),
];
