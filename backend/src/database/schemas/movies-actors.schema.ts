import {
   pgTable,
   integer,
   varchar,
   primaryKey,
   index,
} from 'drizzle-orm/pg-core';
import { movies } from './movies.schema';
import { actors } from './actors.schema';

// Many-to-many junction table between movies and actors
export const moviesActors = pgTable(
   'movies_actors',
   {
      movieId: integer('movie_id')
         .notNull()
         .references(() => movies.id, { onDelete: 'cascade' }),
      actorId: integer('actor_id')
         .notNull()
         .references(() => actors.id, { onDelete: 'cascade' }),
      character: varchar({ length: 255 }), // Character name played by the actor
      role: varchar({ length: 50 }).notNull().default('actor'), // actor, director, producer, etc.
      order: integer().notNull().default(0), // For ordering actors (main cast first)
   },
   (t) => [
      primaryKey({ columns: [t.movieId, t.actorId] }),
      index('idx_movies_actors_movie_id').on(t.movieId),
      index('idx_movies_actors_actor_id').on(t.actorId),
      index('idx_movies_actors_role').on(t.role),
   ],
);

// Type exports
export type MoviesActors = typeof moviesActors.$inferSelect;
export type NewMoviesActors = typeof moviesActors.$inferInsert;
