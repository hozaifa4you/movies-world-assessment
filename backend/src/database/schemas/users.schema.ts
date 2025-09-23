import { relations } from 'drizzle-orm';
import {
   integer,
   pgTable,
   varchar,
   pgEnum,
   timestamp,
   index,
} from 'drizzle-orm/pg-core';
import { watchList } from './watchlists.schema';
import { movies } from './movies.schema';

const role_enum = pgEnum('role_enum', ['super_admin', 'admin', 'user']);
const status_enum = pgEnum('status_enum', ['active', 'inactive', 'banned']);

export const users = pgTable(
   'users',
   {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      name: varchar({ length: 32 }).notNull(),
      email: varchar({ length: 128 }).notNull().unique(),
      password: varchar({ length: 256 }).notNull(),
      avatar: varchar({ length: 256 }),
      role: role_enum('role').notNull().default('user'),
      status: status_enum('status').notNull().default('active'),
      createdAt: timestamp('created_at').defaultNow(),
      updatedAt: timestamp('updated_at')
         .defaultNow()
         .$onUpdate(() => new Date()),
   },
   (table) => [
      index('idx_users_role').on(table.role),
      index('idx_users_status').on(table.status),
      index('idx_users_role_status').on(table.role, table.status),
      index('idx_users_created_at').on(table.createdAt),
   ],
);

export const usersRelations = relations(users, ({ many }) => ({
   watchlist: many(watchList),
}));

export const watchlistRelations = relations(watchList, ({ one }) => ({
   user: one(users, {
      fields: [watchList.userId],
      references: [users.id],
   }),
   movie: one(movies, {
      fields: [watchList.movieId],
      references: [movies.id],
   }),
}));

export type Role = (typeof users.$inferSelect)['role'];
export type Status = (typeof users.$inferSelect)['status'];

export enum RoleEnum {
   SuperAdmin = 'super_admin',
   Admin = 'admin',
   User = 'user',
}

export enum StatusEnum {
   Active = 'active',
   Inactive = 'inactive',
   Banned = 'banned',
}
