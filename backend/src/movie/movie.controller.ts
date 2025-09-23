import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
   Query,
   ParseIntPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/database/schemas';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import type { AuthUserType } from 'src/types/auth';
import {
   PaginationPipe,
   type PaginationQuery,
} from 'src/common/pipes/pagination.pipe';
import { OptionalAuth } from 'src/auth/decorators/optional-auth.decorator';
import { RateMovieDto } from './dto/rate-movie.dto';

@Controller('movies')
export class MovieController {
   constructor(private readonly movieService: MovieService) {}

   @UseGuards(JwtGuard, RolesGuard)
   @Roles(RoleEnum.Admin)
   @Post()
   public async create(
      @Body() createMovieDto: CreateMovieDto,
      @AuthUser() user: AuthUserType,
   ) {
      return this.movieService.create(user.id, createMovieDto);
   }

   @Get()
   findAll(
      @Query(new PaginationPipe()) pagination: PaginationQuery,
      @Query('search') search?: string,
      @Query('genre') genre?: string,
      @Query('year') year?: string,
      @Query('rating') rating?: string,
      @OptionalAuth() userId?: number | null,
   ) {
      return this.movieService.findAll(
         pagination,
         search,
         genre,
         year,
         rating,
         userId ?? undefined,
      );
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.movieService.findOne(+id);
   }

   @Patch(':id')
   public update(
      @Param('id') id: string,
      @Body() updateMovieDto: UpdateMovieDto,
   ) {
      return this.movieService.update(+id, updateMovieDto);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.movieService.remove(+id);
   }

   @Patch(':id/rating')
   @UseGuards(JwtGuard, RolesGuard)
   @Roles(RoleEnum.User)
   public async rateNow(
      @Param('id', ParseIntPipe) id: number,
      @Body() ratingMovieDto: RateMovieDto,
      @AuthUser() user: AuthUserType,
   ) {
      return this.movieService.rateNow(id, user.id, ratingMovieDto);
   }
}
