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
  AuthModule,
  AdminModule,
  RolesModule,
  OptionModule,
  UsersModule,
  ModulesModule,
  PermissionsModule,
  EstablishmentsModule,
  FunctionalitiesModule,
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
          ],
        },
      ],
    },
  ]),
];
