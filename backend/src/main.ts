import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);
   const port = configService.get<number>('app.config.port') || 3000;
   const appName =
      configService.get<string>('app.config.appName') || 'Movies World';

   app.enableCors({
      origin: [configService.get<string>('app.config.appUrl')],
      credentials: true,
   });
   app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
   );
   app.setGlobalPrefix('api/v1');

   await app.listen(port);
   Logger.debug(`${appName} is running on port ${port}`);
}
bootstrap().catch(error);
