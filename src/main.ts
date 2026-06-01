import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config';
import { AllExceptionsFilter } from './common';

async function bootstrap() {
  // Init
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();


  const configureService = app.get(ConfigService);
  const port = configureService.getOrThrow<number>('PORT');
  
  // Use all wares
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  )
  app.useGlobalFilters(new AllExceptionsFilter())

  // Add swagger
  setupSwagger(app);
  logger.log(`Swagger available at http://localhost:${port}/docs`);

  // Start server
  await app.listen(port);
  logger.log(`Gateway started on port ${port}`);
}
bootstrap();
