import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
   imports: [DatabaseModule],
   controllers: [ActorController],
   providers: [ActorService],
})
export class ActorModule {}
