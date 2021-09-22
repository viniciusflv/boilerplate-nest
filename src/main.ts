import { Logger } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  logger.verbose(
    `http://localhost:${port}`,
    `Application Started - ${process.env.ENV}`,
  );

  app.useLogger(app.get(PinoLogger));

  const options = new DocumentBuilder()
    .setTitle('BFF Hello World')
    .setDescription('BFF responsável por demonstrar o NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('/api', app, SwaggerModule.createDocument(app, options));

  await app.listen(port);
}

bootstrap();
