import { relations } from 'drizzle-orm';
import { movies } from './movies.schema';
import { actors } from './actors.schema';
import { users } from './users.schema';
import { moviesActors } from './movies-actors.schema';

// Movies relations
export const moviesRelations = relations(movies, ({ many, one }) => ({
   moviesToActors: many(moviesActors),
   user: one(users, {
      fields: [movies.userId],
      references: [users.id],
   }),
}));

// Actors relations
export const actorsRelations = relations(actors, ({ many }) => ({
   actorsToMovies: many(moviesActors),
}));

// Junction table relations
export const moviesActorsRelations = relations(moviesActors, ({ one }) => ({
   movie: one(movies, {
      fields: [moviesActors.movieId],
      references: [movies.id],
   }),
   actor: one(actors, {
      fields: [moviesActors.actorId],
      references: [actors.id],
   }),
}));
