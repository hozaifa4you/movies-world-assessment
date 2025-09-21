import { timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   name: varchar({ length: 32 }).notNull(),
   email: varchar({ length: 128 }).notNull().unique(),
   password: varchar({ length: 256 }).notNull(),
   avatar: varchar({ length: 256 }),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
});
