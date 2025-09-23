import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DB } from 'src/database/database.module';
import type { Database } from 'src/database/types';
import {
   actors,
   movies,
   moviesActors,
   type NewMovie,
   type NewMoviesActors,
} from 'src/database/schemas';
import { eq } from 'drizzle-orm';

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

   findAll() {
      return `This action returns all movie`;
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
}
