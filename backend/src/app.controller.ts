import {
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guards/auth.guard';
import { AuthUser } from './auth/decorators/auth-user.decorator';
import type { AuthUserType } from './types/auth';
import { RolesGuard } from './auth/guards/role.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { RoleEnum } from './database/schemas';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @HttpCode(HttpStatus.OK)
   @Get('hero-content')
   public async getHeroMovies() {
      return this.appService.getHeroContent();
   }

   @HttpCode(HttpStatus.OK)
   @Get('recent-movies')
   public async getRecentMovies() {
      return this.appService.getRecentMovies();
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(JwtGuard)
   @Get('my-ratings')
   async getMyRatings(@AuthUser() user: AuthUserType) {
      return this.appService.getMyRatings(user.id);
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(JwtGuard)
   @Get('my-watchlist')
   async getMyWatchList(@AuthUser() user: AuthUserType) {
      return this.appService.getMyWatchList(user.id);
   }

   @HttpCode(HttpStatus.OK)
   @UseGuards(JwtGuard, RolesGuard)
   @Roles(RoleEnum.Admin)
   @Get('my-added')
   async getMyAddedList(@AuthUser() user: AuthUserType) {
      return this.appService.getMyAddedList(user.id);
   }
}
