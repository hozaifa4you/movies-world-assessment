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
   ParseIntPipe,
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
export class ActorController {
   constructor(private readonly actorService: ActorService) {}

   @HttpCode(HttpStatus.CREATED)
   @UseGuards(JwtGuard, RolesGuard)
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
   @UseGuards(JwtGuard, RolesGuard)
   @Roles(RoleEnum.Admin)
   @Get('search')
   search(@Query('q') query: string) {
      return this.actorService.search(query);
   }

   @HttpCode(HttpStatus.OK)
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.actorService.findOne(id);
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(JwtGuard, RolesGuard)
   @Roles(RoleEnum.Admin)
   @Patch(':id')
   update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
      return this.actorService.update(+id, updateActorDto);
   }

   @HttpCode(HttpStatus.NO_CONTENT)
   @UseGuards(JwtGuard, RolesGuard)
   @Roles(RoleEnum.Admin)
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
      return this.actorService.remove(id);
   }
}
