import { pgTable, index, foreignKey, integer, varchar, text, date, numeric, timestamp, unique, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const movieStatusEnum = pgEnum("movie_status_enum", ['archived', 'upcoming', 'post-production', 'released', 'draft', 'in-production'])
export const roleEnum = pgEnum("role_enum", ['super_admin', 'admin', 'user'])
export const statusEnum = pgEnum("status_enum", ['active', 'inactive', 'banned'])


export const movies = pgTable("movies", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "movies_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	shortDescription: varchar({ length: 500 }),
	director: varchar({ length: 100 }).notNull(),
	releaseDate: date("release_date"),
	genre: varchar().notNull(),
	rating: numeric({ precision: 3, scale:  1 }),
	posterUrl: varchar("poster_url", { length: 500 }),
	videoUrl: varchar("video_url", { length: 500 }),
	trailerUrl: varchar("trailer_url", { length: 500 }),
	duration: integer(),
	language: varchar({ length: 50 }).default('English').notNull(),
	country: varchar({ length: 100 }),
	budget: numeric({ precision: 15, scale:  2 }),
	revenue: numeric({ precision: 15, scale:  2 }),
	imdbRating: numeric("imdb_rating", { precision: 3, scale:  1 }),
	imdbId: varchar("imdb_id", { length: 20 }),
	status: movieStatusEnum().default('draft').notNull(),
	viewCount: integer("view_count").default(0).notNull(),
	userId: integer("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_movies_created_at").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("idx_movies_director").using("btree", table.director.asc().nullsLast().op("text_ops")),
	index("idx_movies_genre").using("btree", table.genre.asc().nullsLast().op("text_ops")),
	index("idx_movies_imdb_rating").using("btree", table.imdbRating.asc().nullsLast().op("numeric_ops")),
	index("idx_movies_rating").using("btree", table.rating.asc().nullsLast().op("numeric_ops")),
	index("idx_movies_release_date").using("btree", table.releaseDate.asc().nullsLast().op("date_ops")),
	index("idx_movies_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("idx_movies_title").using("btree", table.title.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "movies_user_id_users_id_fk"
		}).onDelete("set null"),
]);

export const actors = pgTable("actors", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "actors_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
	bio: text(),
	birthDate: date("birth_date"),
	deathDate: date("death_date"),
	nationality: varchar({ length: 100 }),
	photoUrl: varchar("photo_url", { length: 500 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	called: text().array(),
}, (table) => [
	index("idx_actors_birth_date").using("btree", table.birthDate.asc().nullsLast().op("date_ops")),
	index("idx_actors_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	index("idx_actors_nationality").using("btree", table.nationality.asc().nullsLast().op("text_ops")),
]);

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 32 }).notNull(),
	email: varchar({ length: 128 }).notNull(),
	password: varchar({ length: 256 }).notNull(),
	avatar: varchar({ length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	role: roleEnum().default('user').notNull(),
	status: statusEnum().default('active').notNull(),
}, (table) => [
	index("idx_users_created_at").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("idx_users_role").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	index("idx_users_role_status").using("btree", table.role.asc().nullsLast().op("enum_ops"), table.status.asc().nullsLast().op("enum_ops")),
	index("idx_users_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	unique("users_email_unique").on(table.email),
]);

export const moviesActors = pgTable("movies_actors", {
	movieId: integer("movie_id").notNull(),
	actorId: integer("actor_id").notNull(),
	character: varchar({ length: 255 }),
	role: varchar({ length: 50 }).default('actor').notNull(),
	order: integer().default(0).notNull(),
}, (table) => [
	index("idx_movies_actors_actor_id").using("btree", table.actorId.asc().nullsLast().op("int4_ops")),
	index("idx_movies_actors_movie_id").using("btree", table.movieId.asc().nullsLast().op("int4_ops")),
	index("idx_movies_actors_role").using("btree", table.role.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.movieId],
			foreignColumns: [movies.id],
			name: "movies_actors_movie_id_movies_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.actorId],
			foreignColumns: [actors.id],
			name: "movies_actors_actor_id_actors_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.movieId, table.actorId], name: "movies_actors_movie_id_actor_id_pk"}),
]);
