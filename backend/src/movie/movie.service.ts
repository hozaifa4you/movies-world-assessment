import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DB } from 'src/database/database.module';
import type { Database } from 'src/database/types';
import {
   actors,
   movies,
   moviesActors,
   ratings,
   type NewMovie,
   type NewMoviesActors,
} from 'src/database/schemas';
import { eq, desc, count, ilike, and, gte, sql, or } from 'drizzle-orm';
import { PaginationQuery } from 'src/common/pipes/pagination.pipe';
import { RateMovieDto } from './dto/rate-movie.dto';

@Injectable()
export class MovieService {
   constructor(@Inject(DB) private readonly db: Database) {}

   async create(userId: number, createMovieDto: CreateMovieDto) {
      const {
         actors: actorDetails,
         budget,
         revenue,
         imdbRating,
         genre,
         posterUrl,
         trailerUrl,
         ...movieData
      } = createMovieDto;

      return await this.db.transaction(async (tx) => {
         const movieInsertData: NewMovie = {
            ...movieData,
            genre: Array.isArray(genre) ? genre : [genre],
            budget: budget !== undefined ? budget.toString() : null,
            revenue: revenue !== undefined ? revenue.toString() : null,
            imdbRating: imdbRating !== undefined ? imdbRating.toString() : null,
            userId,
            posterUrl: posterUrl || null,
            trailerUrl: trailerUrl || null,
         };

         const [newMovie] = await tx
            .insert(movies)
            .values(movieInsertData)
            .returning();

         const movieActorRelations: NewMoviesActors[] = [];

         if (actorDetails && actorDetails.length > 0) {
            for (const actorDetail of actorDetails) {
               const actor = await this.db.query.actors.findFirst({
                  where: eq(actors.id, actorDetail.actorId),
               });

               if (!actor) {
                  throw new BadRequestException(
                     'Invalid actor ID: ' + actorDetail.actorId,
                  );
               }

               movieActorRelations.push({
                  movieId: newMovie.id,
                  actorId: actorDetail.actorId,
                  character: actorDetail.character || null,
                  role: actorDetail.role || 'actor',
                  order: actorDetail.order || 0,
               });
            }
         }

         await tx.insert(moviesActors).values(movieActorRelations);

         return {
            success: true,
         };
      });
   }

   async findAll(
      pagination: PaginationQuery,
      search?: string,
      genre?: string,
      year?: string,
      rating?: string,
      userId?: number,
   ) {
      const { page, pageSize } = pagination;
      const offset = (page - 1) * pageSize;

      const conditions: any[] = [];

      if (search) {
         conditions.push(
            or(
               ilike(movies.title, `%${search}%`),
               ilike(movies.description, `%${search}%`),
            ),
         );
      }

      if (genre) {
         conditions.push(sql`${genre} ILIKE ANY(${movies.genre})`);
      }

      if (year) {
         conditions.push(
            eq(sql`EXTRACT(YEAR FROM ${movies.releaseDate})`, year),
         );
      }

      if (rating) {
         conditions.push(gte(movies.rating, rating));
      }

      const [totalCount] = await this.db
         .select({ count: count() })
         .from(movies)
         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
         .where(conditions.length ? and(...conditions) : undefined);

      const moviesList = await this.db.query.movies.findMany({
         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
         where: conditions.length ? and(...conditions) : undefined,
         limit: pageSize,
         offset,
         orderBy: [desc(movies.createdAt)],
         columns: {
            id: true,
            title: true,
            posterUrl: true,
            genre: true,
            shortDescription: true,
            releaseDate: true,
            rating: true,
            trailerUrl: true,
         },
      });

      if (userId) {
         const _result = moviesList.map(async (movie) => {
            const qry = await this.db.query.ratings.findFirst({
               where: and(
                  eq(ratings.movieId, movie.id),
                  eq(ratings.userId, userId),
               ),
            });

            return { ...movie, userRating: qry ? true : false };
         });

         const moviesListWithUserRating = await Promise.all(_result);

         const totalPages = Math.ceil(totalCount.count / pageSize);

         return {
            data: moviesListWithUserRating,
            pagination: {
               page,
               limit: pageSize,
               total: totalCount.count,
               totalPages,
               hasNext: page < totalPages,
               hasPrev: page > 1,
            },
         };
      }

      const totalPages = Math.ceil(totalCount.count / pageSize);

      return {
         data: moviesList,
         pagination: {
            page,
            limit: pageSize,
            total: totalCount.count,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
         },
      };
   }

   findOne(id: number) {
      return `This action returns a #${id} movie`;
   }

   update(id: number, _updateMovieDto: UpdateMovieDto) {
      return `This action updates a #${id} movie`;
   }

   remove(id: number) {
      return `This action removes a #${id} movie`;
   }

   public async rateNow(
      id: number,
      userId: number,
      ratingMovieDto: RateMovieDto,
   ) {
      const existingRating = await this.db.query.ratings.findFirst({
         where: and(eq(ratings.movieId, id), eq(ratings.userId, userId)),
      });

      if (existingRating) {
         throw new BadRequestException('You have already rated this movie.');
      }

      const returning = await this.db
         .insert(ratings)
         .values({
            movieId: id,
            userId,
            rating: ratingMovieDto.rating,
            review: ratingMovieDto.review || null,
         })
         .returning();

      const result = await this.db
         .select({ avg: sql<number>`AVG(${ratings.rating})` })
         .from(ratings)
         .where(eq(ratings.movieId, id));

      const avgRatingRaw = result[0]?.avg ?? 0;
      const avgRating = Number(avgRatingRaw);

      await this.db
         .update(movies)
         .set({
            rating: avgRating.toFixed(1),
         })
         .where(eq(movies.id, id));

      return returning[0];
   }
}
