import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get('hero-content')
   public async getHeroMovies() {
      return this.appService.getHeroContent();
   }

   @Get('recent-movies')
   public async getRecentMovies() {
      return this.appService.getRecentMovies();
   }

   @Get('my-ratings')
   async getMyRatings() {}
}
