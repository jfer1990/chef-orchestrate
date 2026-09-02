CREATE TYPE "base_unit_enum" AS ENUM('g', 'ml', 'unidad');--> statement-breakpoint
CREATE TYPE "currency_enum" AS ENUM('MXN', 'USD', 'EUR', 'GTQ', 'COP', 'ARS');--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" serial PRIMARY KEY,
	"line_one" text NOT NULL,
	"line_two" text,
	"city" text NOT NULL,
	"state" text,
	"postal_code" text NOT NULL,
	"country" text NOT NULL,
	"location" geometry(point) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meal" (
	"id" serial PRIMARY KEY,
	"name" varchar(150) NOT NULL,
	"base_unit" "base_unit_enum" NOT NULL,
	"cost" numeric(8,2) DEFAULT '0' NOT NULL,
	"currency" "currency_enum" DEFAULT 'MXN'::"currency_enum" NOT NULL,
	"rate_ext_sell" numeric(5,2) DEFAULT '0' NOT NULL,
	"rate_interal_sell" numeric(5,2),
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meal_ingredient" (
	"id" serial PRIMARY KEY,
	"meal_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"quantity" numeric(12,3) NOT NULL,
	"measure_unit" "base_unit_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uq_receta" UNIQUE("meal_id","ingredient_id"),
	CONSTRAINT "chk_no_auto_referencia" CHECK ("meal_id" <> "ingredient_id")
);
--> statement-breakpoint
CREATE TABLE "meal_supplier" (
	"id" serial PRIMARY KEY,
	"meal_id" integer NOT NULL,
	"supplier_id" integer NOT NULL,
	"price" numeric(5,2),
	"base_unit" "base_unit_enum" NOT NULL,
	"quantity" numeric(8,2) NOT NULL,
	"currency" "currency_enum" DEFAULT 'MXN'::"currency_enum" NOT NULL,
	"update_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "addresses_supplier" (
	"id" serial PRIMARY KEY,
	"supplier_id" integer NOT NULL,
	"addesses_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supplier" (
	"id" serial PRIMARY KEY,
	"commercial_name" varchar(150) NOT NULL,
	"tax_id" varchar(30) NOT NULL,
	"email" text,
	"phone1" text,
	"phone2" text,
	"contact_name" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "meal_supplier_meal_id_idx" ON "meal_supplier" ("meal_id");--> statement-breakpoint
CREATE INDEX "meal_supplier_supplier_id_idx" ON "meal_supplier" ("supplier_id");--> statement-breakpoint
CREATE INDEX "meal_supplier_meal_supplier_idx" ON "meal_supplier" ("meal_id","supplier_id");--> statement-breakpoint
CREATE INDEX "meal_supplier_supplier_meal_idx" ON "meal_supplier" ("supplier_id","meal_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_active_idx" ON "session" ("user_id","is_active");--> statement-breakpoint
ALTER TABLE "meal_ingredient" ADD CONSTRAINT "meal_ingredient_meal_id_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meal_ingredient" ADD CONSTRAINT "meal_ingredient_ingredient_id_meal_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "meal"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "meal_supplier" ADD CONSTRAINT "meal_supplier_meal_id_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meal_supplier" ADD CONSTRAINT "meal_supplier_supplier_id_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "addresses_supplier" ADD CONSTRAINT "addresses_supplier_supplier_id_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "addresses_supplier" ADD CONSTRAINT "addresses_supplier_addesses_id_addresses_id_fkey" FOREIGN KEY ("addesses_id") REFERENCES "addresses"("id") ON DELETE CASCADE;