import { Storage } from '@google-cloud/storage';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import path from 'path';
import storageConfig from 'src/config/storage.config';
import fs from 'fs';
import { log } from 'console';

@Injectable()
export class UploadService {
   constructor(
      private readonly storage: Storage,
      @Inject(storageConfig.KEY)
      private readonly config: ConfigType<typeof storageConfig>,
   ) {}

   public async uploadPoster(poster: Express.Multer.File) {
      const bucket = this.storage.bucket(this.config.gcpBucket!);
      const filepath = path.resolve(process.cwd(), poster.path);

      const [file] = await bucket.upload(filepath, {
         destination: `posters/${poster.filename}`,
         public: true,
         metadata: {
            contentType: poster.mimetype,
         },
      });

      fs.unlinkSync(filepath);

      const url = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      return { url, filename: poster.filename };
   }

   public async removePoster(filename: string) {
      const bucket = this.storage.bucket(this.config.gcpBucket!);
      const file = bucket.file(`posters/${filename}`);

      try {
         await file.delete({ ignoreNotFound: true });
      } catch (error) {
         log(error);
         throw new BadRequestException("Couldn't delete the file");
      }
   }
}
