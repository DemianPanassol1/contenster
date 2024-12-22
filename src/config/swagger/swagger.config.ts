import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function swaggerInstance(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Contenster Project')
    .setDescription('contenster project API')
    .addBearerAuth(
      {
        name: 'JWT',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: '',
      },
      'Bearer-JWT',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Contenster Project',
  });
}

export default swaggerInstance;
