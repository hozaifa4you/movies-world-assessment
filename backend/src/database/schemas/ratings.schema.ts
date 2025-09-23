import {
   pgTable,
   integer,
   varchar,
   timestamp,
   primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { movies } from './movies.schema';

export const ratings = pgTable(
   'ratings',
   {
      userId: integer('user_id')
         .notNull()
         .references(() => users.id),
      movieId: integer('movie_id')
         .notNull()
         .references(() => movies.id),
      rating: integer('rating').notNull(),
      review: varchar('review', { length: 1000 }),
      ratedAt: timestamp('rated_at').defaultNow(),
   },
   (t) => [primaryKey({ columns: [t.userId, t.movieId] })],
);

export const ratingsRelations = relations(ratings, ({ one }) => ({
   user: one(users, {
      fields: [ratings.userId],
      references: [users.id],
   }),
   movie: one(movies, {
      fields: [ratings.movieId],
      references: [movies.id],
   }),
}));
