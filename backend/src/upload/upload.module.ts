import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Storage } from '@google-cloud/storage';
import storageConfig from 'src/config/storage.config';
import { ConfigModule, ConfigType } from '@nestjs/config';

@Module({
   imports: [ConfigModule.forFeature(storageConfig)],
   controllers: [UploadController],
   providers: [
      {
         provide: Storage,
         inject: [storageConfig.KEY],
         useFactory: (config: ConfigType<typeof storageConfig>) =>
            new Storage({
               projectId: config.gcpProjectId,
               keyFilename: config.gcpKeyFile,
            }),
      },
      UploadService,
   ],
})
export class UploadModule {}
