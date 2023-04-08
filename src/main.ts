import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('API description')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    // .addServer('https://localhost:4000')
    // .addServer('https://api-dev.com')
    // .addServer('https://api-hom.com')
    // .addServer('https://api.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(4000);

  console.log(
    JSON.stringify(
      {
        swagger: 'http://localhost:4000/api',
        openapi: 'http://localhost:4000/api-json',
      },
      undefined,
      2,
    ),
  );
}
bootstrap();
