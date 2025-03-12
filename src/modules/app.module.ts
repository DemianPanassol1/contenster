import { join } from 'path';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import variables from 'src/settings';

import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { defaultLanguage, typeOrmModuleOptions } from 'src/config/constants/constants.config';

import contenster from './contenster';

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
    ...contenster,
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
