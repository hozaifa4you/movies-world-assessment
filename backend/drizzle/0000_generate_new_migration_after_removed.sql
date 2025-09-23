CREATE TABLE "actors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "actors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"bio" text,
	"birth_date" date,
	"death_date" date,
	"nationality" varchar(100),
	"photo_url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"called" text[]
);
--> statement-breakpoint
CREATE TABLE "movies_actors" (
	"movie_id" integer NOT NULL,
	"actor_id" integer NOT NULL,
	"character" varchar(255),
	"role" varchar(50) DEFAULT 'actor' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "movies_actors_movie_id_actor_id_pk" PRIMARY KEY("movie_id","actor_id")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" text,
	"shortDescription" varchar(500),
	"director" varchar(100) NOT NULL,
	"release_date" date,
	"genre" varchar[],
	"rating" numeric(3, 1),
	"poster_url" varchar(500),
	"video_url" varchar(500),
	"trailer_url" varchar(500),
	"duration" integer,
	"language" varchar(50) DEFAULT 'English' NOT NULL,
	"country" varchar(100),
	"budget" numeric(15, 2),
	"revenue" numeric(15, 2),
	"imdb_rating" numeric(3, 1),
	"imdb_id" varchar(20),
	"status" "movie_status_enum" DEFAULT 'draft' NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(32) NOT NULL,
	"email" varchar(128) NOT NULL,
	"password" varchar(256) NOT NULL,
	"avatar" varchar(256),
	"role" "role_enum" DEFAULT 'user' NOT NULL,
	"status" "status_enum" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "movies_actors" ADD CONSTRAINT "movies_actors_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies_actors" ADD CONSTRAINT "movies_actors_actor_id_actors_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."actors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_actors_name" ON "actors" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_actors_birth_date" ON "actors" USING btree ("birth_date");--> statement-breakpoint
CREATE INDEX "idx_actors_nationality" ON "actors" USING btree ("nationality");--> statement-breakpoint
CREATE INDEX "idx_movies_actors_movie_id" ON "movies_actors" USING btree ("movie_id");--> statement-breakpoint
CREATE INDEX "idx_movies_actors_actor_id" ON "movies_actors" USING btree ("actor_id");--> statement-breakpoint
CREATE INDEX "idx_movies_actors_role" ON "movies_actors" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_movies_title" ON "movies" USING btree ("title");--> statement-breakpoint
CREATE INDEX "idx_movies_genre" ON "movies" USING btree ("genre");--> statement-breakpoint
CREATE INDEX "idx_movies_director" ON "movies" USING btree ("director");--> statement-breakpoint
CREATE INDEX "idx_movies_release_date" ON "movies" USING btree ("release_date");--> statement-breakpoint
CREATE INDEX "idx_movies_rating" ON "movies" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "idx_movies_status" ON "movies" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_movies_created_at" ON "movies" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_movies_imdb_rating" ON "movies" USING btree ("imdb_rating");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_users_status" ON "users" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_users_role_status" ON "users" USING btree ("role","status");--> statement-breakpoint
CREATE INDEX "idx_users_created_at" ON "users" USING btree ("created_at");