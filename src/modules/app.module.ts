import { join } from 'path';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule } from 'nestjs-i18n';

import variables from 'src/settings';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { defaultLanguage, typeOrmModuleOptions } from 'src/config/constants/constants.config';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OptionModule } from './option/option.module';
import { ApiModule } from 'src/modules/api/api.module';

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
      resolvers: [AcceptLanguageResolver, new HeaderResolver(['x-lang']), new CookieResolver()],
    }),
    ApiModule,
    AdminModule,
    AuthModule,
    OptionModule,
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
