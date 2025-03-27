import { join } from 'path';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import variables from 'src/settings';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { defaultLanguage, typeOrmModuleOptions } from 'src/config/constants/constants.config';

import { RequestLog } from 'src/entities/contensterdb/requestLog.entity';

import contenster from './contenster';

@Module({
  imports: [
    // Configuração do TypeORM para múltiplos bancos de dados
    ...variables.DATABASES.map((dbConfig) => TypeOrmModule.forRoot(typeOrmModuleOptions(dbConfig))),

    // Configuração do ThrottlerModule para controle de taxa de requisições
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),

    // Configuração para servir arquivos estáticos
    ServeStaticModule.forRoot({
      renderPath: '{*splat}',
      exclude: ['/api/{*all}'],
      rootPath: join(__dirname.replace('dist', ''), '..', 'client', 'build'),
    }),

    // Configuração do módulo de internacionalização (i18n)
    I18nModule.forRoot({
      fallbackLanguage: defaultLanguage,
      loaderOptions: {
        path: join(__dirname, '..', '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-lang'])],
    }),

    // Configuração do módulo de agendamento de tarefas
    ScheduleModule.forRoot(),

    // Registro da entidade RequestLog
    TypeOrmModule.forFeature([RequestLog]),

    // Importação de outros módulos
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
