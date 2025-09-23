import {
   Controller,
   NotFoundException,
   Post,
   UploadedFile,
   UseGuards,
   UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/database/schemas';

@Controller('uploads')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RoleEnum.Admin)
export class UploadController {
   constructor(private readonly uploadService: UploadService) {}

   @UseInterceptors(
      FileInterceptor('poster', {
         fileFilter(req, file, callback) {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
               return callback(
                  new NotFoundException('Only image files are allowed!'),
                  false,
               );
            }
         },
         storage: diskStorage({
            destination: (file, req, callback) => {
               const uploadpath = './public/uploads/temp';

               if (!fs.existsSync(uploadpath)) {
                  fs.mkdirSync(uploadpath, { recursive: true });
               }

               callback(null, uploadpath);
            },
            filename: (req, file, callback) => {
               const rawFilename = file.originalname
                  .replace(/\.[^/.]+$/, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase();
               const extName = path.extname(file.originalname);
               const filename = `${rawFilename}-${Date.now()}${extName}`;

               callback(null, filename);
            },
         }),
      }),
   )
   @Post('poster')
   uploadPoster(@UploadedFile() poster?: Express.Multer.File) {
      console.log(poster);

      return { success: true };
   }
}
