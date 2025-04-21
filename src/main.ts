import { join } from 'path';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { useContainer } from 'class-validator';
import { VersioningType } from '@nestjs/common';
import { createDatabase } from 'typeorm-extension';
import { NextFunction, Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

import variables from 'src/settings';
import { AppModule } from 'src/modules/app.module';
import winstonInstance from 'src/config/winston/winston.config';
import swaggerInstance from 'src/config/swagger/swagger.config';
import sessionInstance from 'src/config/session/session.config';
import { dbOptions, environment, HTTPS } from 'src/config/constants/constants.config';

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

  app.set('trust proxy', 1);

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });

  swaggerInstance(app);

  app.useGlobalPipes(new I18nValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalFilters(new I18nValidationExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use((req: Request, res: Response, next: NextFunction) => {
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          mediaSrc: ["'self'", 'blob:'],
          scriptSrc: ["'self'"],
          objectSrc: ["'self'"],
        },
      },
      crossOriginResourcePolicy: { policy: HTTPS ? 'same-origin' : 'cross-origin' },
      frameguard: { action: 'sameorigin' },
    })(req, res, next);
  });

  app.use((req: Request, _res: Response, next: NextFunction) => {
    req.startTime = Date.now();

    next();
  });

  app.use(compression());

  app.use(session(sessionInstance()));

  app.useStaticAssets(join(__dirname, '..', 'public'));

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
