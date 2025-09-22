import { relations } from "drizzle-orm/relations";
import { users, movies, moviesActors, actors } from "./schema";

export const moviesRelations = relations(movies, ({one, many}) => ({
	user: one(users, {
		fields: [movies.userId],
		references: [users.id]
	}),
	moviesActors: many(moviesActors),
}));

export const usersRelations = relations(users, ({many}) => ({
	movies: many(movies),
}));

export const moviesActorsRelations = relations(moviesActors, ({one}) => ({
	movie: one(movies, {
		fields: [moviesActors.movieId],
		references: [movies.id]
	}),
	actor: one(actors, {
		fields: [moviesActors.actorId],
		references: [actors.id]
	}),
}));

export const actorsRelations = relations(actors, ({many}) => ({
	moviesActors: many(moviesActors),
}));