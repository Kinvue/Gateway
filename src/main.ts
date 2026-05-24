import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const configureService = app.get(ConfigService);
  const port = configureService.getOrThrow<number>('PORT');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(port);
  logger.log(`Gateway started on port ${port}`);
}
bootstrap();
