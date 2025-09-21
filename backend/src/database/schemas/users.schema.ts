import { timestamp } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer, pgTable } from 'drizzle-orm/pg-core';

const role_enum = pgEnum('role_enum', ['super_admin', 'admin', 'user']);
const status_enum = pgEnum('status_enum', ['active', 'inactive', 'banned']);

export const users = pgTable('users', {
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
});

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
