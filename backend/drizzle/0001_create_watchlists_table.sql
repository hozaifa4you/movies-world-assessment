CREATE TABLE "watch_lists" (
	"user_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	CONSTRAINT "watch_lists_user_id_movie_id_pk" PRIMARY KEY("user_id","movie_id")
);
--> statement-breakpoint
ALTER TABLE "watch_lists" ADD CONSTRAINT "watch_lists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watch_lists" ADD CONSTRAINT "watch_lists_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;