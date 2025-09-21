import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         load: [appConfig, jwtConfig],
      }),
      DatabaseModule,
      AuthModule,
      UserModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
