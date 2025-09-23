import { Inject, Injectable } from '@nestjs/common';
import type { Database } from './database/types';
import { DB } from './database/database.module';
import { and, desc, isNotNull, eq, or, count } from 'drizzle-orm';
import { movies, ratings, watchList } from './database/schemas';

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

   public async getRecentMovies() {
      const recentMovies = await this.db.query.movies.findMany({
         limit: 5,
         orderBy: desc(movies.createdAt),
         where: isNotNull(movies.posterUrl),
         columns: {
            id: true,
            posterUrl: true,
            trailerUrl: true,
         },
      });

      return recentMovies;
   }

   public async getMyRatings(userId: number) {
      const result = await this.db
         .select({
            id: movies.id,
            title: movies.title,
            rating: movies.rating,
            posterUrl: movies.posterUrl,
            trailerUrl: movies.trailerUrl,
         })
         .from(movies)
         .leftJoin(ratings, eq(ratings.movieId, movies.id))
         .where(eq(ratings.userId, userId))
         .orderBy(desc(movies.createdAt))
         .limit(10);

      const _results = result.map(async (t) => {
         const [countValue] = await this.db
            .select({ count: count() })
            .from(ratings)
            .where(eq(ratings.movieId, t.id));

         return { ...t, reviewCount: Number(countValue.count) };
      });

      const finalResults = await Promise.all(_results);

      return finalResults;
   }

   public async getMyWatchList(userId: number) {
      const result = await this.db
         .select({
            id: movies.id,
            title: movies.title,
            ratings: movies.rating,
            posterUrl: movies.posterUrl,
            trailerUrl: movies.trailerUrl,
         })
         .from(watchList)
         .leftJoin(movies, eq(watchList.movieId, movies.id))
         .where(eq(watchList.userId, userId))
         .limit(10);

      return result;
   }

   public async getMyAddedList(userId: number) {
      const list = await this.db.query.movies.findMany({
         where: eq(movies.userId, userId),
         columns: { id: true, title: true, posterUrl: true },
         orderBy: desc(movies.createdAt),
         limit: 2,
      });

      return list;
   }
}
