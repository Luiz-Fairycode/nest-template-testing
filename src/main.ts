import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';

async function bootstrap() {
  // MODULO PRINCIPAL
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('Template Api description')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    // .addTag('template')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // PORTA
  await app.listen(process.env.PORT);
}
bootstrap();
