import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('EMS-API');

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new PrismaExceptionFilter(httpAdapterHost.httpAdapter),
    new HttpExceptionFilter(),
  );

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // strip unknown properties
      forbidNonWhitelisted: true,    // throw if unknown props sent
      transform: true,               // auto-cast types from route/query params
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

