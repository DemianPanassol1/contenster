import { join } from 'path';
import helmet from 'helmet';
import enforce from 'express-sslify';
import compression from 'compression';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { useContainer } from 'class-validator';
import { createDatabase } from 'typeorm-extension';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
  dbOptions,
  environment,
  HTTPS,
} from './config/constants/constants.config';
import variables from './settings';
import { AppModule } from './modules/app.module';
import winstonInstance from './config/winston/winston.config';
import swaggerInstance from './config/swagger/swagger.config';
import sessionInstance from './config/session/session.config';

(async () => {
  await Promise.allSettled(
    variables.DATABASES.map((dbConfig) =>
      createDatabase({
        ifNotExist: true,
        options: dbOptions(dbConfig),
        synchronize: false,
      }),
    ),
  );

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstonInstance }),
  });

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });

  swaggerInstance(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (HTTPS) {
    app.use(enforce.HTTPS({ trustProtoHeader: false }));
  }

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", 'https://api.example.com'],
          styleSrc: ["'self'", "'nonce-<random-value>'"],
          imgSrc: ["'self'", 'data:'],
          scriptSrc: ["'self'", "'nonce-<random-value>'"],
        },
      },
      crossOriginResourcePolicy: { policy: 'same-origin' },
      frameguard: { action: 'sameorigin' },
    }),
  );

  app.use(compression());

  app.use(session(sessionInstance()));

  app.useStaticAssets(join(__dirname.replace('dist', ''), '..', 'public'));

  await app.listen(variables.PORT);

  console.log('\n');
  console.log('==========================================');
  console.log('🚀 Application successfully started!');
  console.log('------------------------------------------');
  console.log(`🌐 URL:         ${await app.getUrl()}`);
  console.log(`🌎 Environment: ${environment.toUpperCase()}`);
  console.log(`📦 Port:        ${variables.PORT}`);
  console.log('==========================================');
  console.log('\n');
})();
