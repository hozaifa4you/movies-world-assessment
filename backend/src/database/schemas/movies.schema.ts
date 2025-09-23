import {
   pgTable,
   integer,
   varchar,
   text,
   date,
   timestamp,
   decimal,
   pgEnum,
   index,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { relations } from 'drizzle-orm';
import { ratings } from './ratings.schema';

const status_enum = pgEnum('movie_status_enum', [
   'archived',
   'upcoming',
   'post-production',
   'released',
   'draft',
   'in-production',
]);

export const movies = pgTable(
   'movies',
   {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      title: varchar({ length: 255 }).notNull(),
      description: text(),
      shortDescription: varchar({ length: 500 }),
      director: varchar({ length: 100 }).notNull(),
      releaseDate: date('release_date'),
      genre: varchar().notNull().array(),
      rating: decimal({ precision: 3, scale: 1 }),
      posterUrl: varchar('poster_url', { length: 500 }),
      videoUrl: varchar('video_url', { length: 500 }),
      trailerUrl: varchar('trailer_url', { length: 500 }),
      duration: integer(),
      language: varchar({ length: 50 }).notNull().default('English'),
      country: varchar({ length: 100 }),
      budget: decimal({ precision: 15, scale: 2 }),
      revenue: decimal({ precision: 15, scale: 2 }),
      imdbRating: decimal('imdb_rating', { precision: 3, scale: 1 }),
      imdbId: varchar('imdb_id', { length: 20 }),
      status: status_enum('status').notNull().default('draft'),
      viewCount: integer('view_count').notNull().default(0),
      userId: integer('user_id')
         .notNull()
         .references(() => users.id, { onDelete: 'set null' }),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at')
         .defaultNow()
         .notNull()
         .$onUpdate(() => new Date()),
   },
   (table) => [
      index('idx_movies_title').on(table.title),
      index('idx_movies_genre').on(table.genre),
      index('idx_movies_director').on(table.director),
      index('idx_movies_release_date').on(table.releaseDate),
      index('idx_movies_rating').on(table.rating),
      index('idx_movies_status').on(table.status),
      index('idx_movies_created_at').on(table.createdAt),
      index('idx_movies_imdb_rating').on(table.imdbRating),
   ],
);

export const moviesRelations_ratings = relations(movies, ({ many }) => ({
   ratings: many(ratings),
}));

export type Movie = typeof movies.$inferSelect;
export type NewMovie = typeof movies.$inferInsert;
