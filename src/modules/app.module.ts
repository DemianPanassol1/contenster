import { join } from 'path';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import variables from 'src/settings';
import { typeOrmModuleOptions } from 'src/config/constants/constants.config';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@Module({
  imports: [
    ...variables.DATABASES.map((dbConfig) =>
      TypeOrmModule.forRoot(typeOrmModuleOptions(dbConfig)),
    ),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    ServeStaticModule.forRoot({
      renderPath: '*',
      exclude: ['/api/(.*)'],
      rootPath: join(__dirname.replace('dist', ''), '..', 'client', 'build'),
    }),
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
