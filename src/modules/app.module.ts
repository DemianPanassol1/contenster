import { join } from 'path';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

import variables from 'src/settings';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { defaultLanguage, typeOrmModuleOptions } from 'src/config/constants/constants.config';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OptionModule } from './option/option.module';
import { ApiModule } from 'src/modules/api/api.module';
import { RolesModule } from './roles/roles.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ...variables.DATABASES.map((dbConfig) => TypeOrmModule.forRoot(typeOrmModuleOptions(dbConfig))),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    ServeStaticModule.forRoot({
      renderPath: '*',
      exclude: ['/api/(.*)'],
      rootPath: join(__dirname.replace('dist', ''), '..', 'client', 'build'),
    }),
    I18nModule.forRoot({
      fallbackLanguage: defaultLanguage,
      loaderOptions: {
        path: join(__dirname, '..', '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-lang'])],
    }),
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
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
