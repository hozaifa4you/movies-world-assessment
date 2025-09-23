import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { movies } from './movies.schema';

export const watchList = pgTable(
   'watch_lists',
   {
      userId: integer('user_id')
         .notNull()
         .references(() => users.id, { onDelete: 'cascade' }),
      movieId: integer('movie_id')
         .notNull()
         .references(() => movies.id, { onDelete: 'cascade' }),
   },
   (t) => [primaryKey({ columns: [t.userId, t.movieId] })],
);
