import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
   constructor(private readonly storage: Storage) {}

   public uploadPoster(poster: Express.Multer.File) {
      return { poster: poster.filename };
   }
}
