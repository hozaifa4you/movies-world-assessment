import {
   pgTable,
   integer,
   varchar,
   text,
   date,
   timestamp,
   index,
} from 'drizzle-orm/pg-core';

export const actors = pgTable(
   'actors',
   {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      name: varchar({ length: 100 }).notNull(),
      bio: text(),
      birthDate: date('birth_date'),
      deathDate: date('death_date'),
      nationality: varchar({ length: 100 }),
      photoUrl: varchar('photo_url', { length: 500 }),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at')
         .defaultNow()
         .notNull()
         .$onUpdate(() => new Date()),
      called: text().array(),
   },
   (table) => [
      index('idx_actors_name').on(table.name),
      index('idx_actors_birth_date').on(table.birthDate),
      index('idx_actors_nationality').on(table.nationality),
   ],
);

// Type exports
export type Actor = typeof actors.$inferSelect;
export type NewActor = typeof actors.$inferInsert;
