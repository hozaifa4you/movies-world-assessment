import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
   HttpCode,
   HttpStatus,
   Query,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/database/schemas';
import {
   PaginationPipe,
   type PaginationQuery,
} from 'src/common/pipes/pagination.pipe';

@Controller('actors')
@UseGuards(JwtGuard)
export class ActorController {
   constructor(private readonly actorService: ActorService) {}

   @HttpCode(HttpStatus.CREATED)
   @UseGuards(RolesGuard)
   @Roles(RoleEnum.Admin)
   @Post()
   async create(@Body() createActorDto: CreateActorDto) {
      return this.actorService.create(createActorDto);
   }

   @HttpCode(HttpStatus.OK)
   @Get()
   findAll(@Query(PaginationPipe) pagination: PaginationQuery) {
      return this.actorService.findAll(pagination);
   }

   @HttpCode(HttpStatus.OK)
   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.actorService.findOne(+id);
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(RolesGuard)
   @Roles(RoleEnum.Admin)
   @Patch(':id')
   update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
      return this.actorService.update(+id, updateActorDto);
   }

   @HttpCode(HttpStatus.NO_CONTENT)
   @UseGuards(RolesGuard)
   @Roles(RoleEnum.Admin)
   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.actorService.remove(+id);
   }
}
