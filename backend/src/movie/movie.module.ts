import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
   imports: [DatabaseModule],
   controllers: [MovieController],
   providers: [MovieService],
})
export class MovieModule {}
