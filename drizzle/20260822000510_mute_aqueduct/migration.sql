CREATE TABLE "session" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"refresh_token_hash" text NOT NULL,
	"device_type" text,
	"expires_at" timestamp,
	"is_active" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;