import { Inject, Injectable } from '@nestjs/common';
import type { Database } from './database/types';
import { DB } from './database/database.module';
import { and, desc, isNotNull, eq, or } from 'drizzle-orm';
import { movies } from './database/schemas';

@Injectable()
export class AppService {
   constructor(@Inject(DB) private readonly db: Database) {}

   public async getHeroContent() {
      const moviesResult = await this.db.query.movies.findMany({
         limit: 5,
         orderBy: desc(movies.createdAt),
         where: and(
            isNotNull(movies.posterUrl),
            or(
               eq(movies.status, 'released'),
               eq(movies.status, 'upcoming'),
               eq(movies.status, 'post-production'),
            ),
         ),
         columns: {
            id: true,
            title: true,
            posterUrl: true,
            releaseDate: true,
            status: true,
            rating: true,
            shortDescription: true,
            genre: true,
         },
      });

      return moviesResult;
   }
}
