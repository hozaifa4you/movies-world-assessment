import { pgTable, integer } from 'drizzle-orm/pg-core';

export const movies = pgTable('movies', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
