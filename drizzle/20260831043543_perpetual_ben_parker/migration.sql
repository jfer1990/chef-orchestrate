CREATE TYPE "base_unit_enum" AS ENUM('g', 'ml', 'unidad');--> statement-breakpoint
CREATE TYPE "currency_enum" AS ENUM('MXN', 'USD', 'EUR', 'GTQ', 'COP', 'ARS');--> statement-breakpoint
CREATE TABLE "alimento_ingrediente" (
	"id" serial PRIMARY KEY,
	"alimento_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"cantidad" numeric(12,3) NOT NULL,
	"unidad_medida" "base_unit_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uq_receta" UNIQUE("alimento_id","ingredient_id"),
	CONSTRAINT "chk_no_auto_referencia" CHECK ("alimento_id" <> "ingredient_id")
);
--> statement-breakpoint
CREATE TABLE "alimento" (
	"id" serial PRIMARY KEY,
	"nombre" varchar(150) NOT NULL,
	"base_unit" "base_unit_enum" NOT NULL,
	"cost" numeric(12,2) DEFAULT '0' NOT NULL,
	"currency" "currency_enum" DEFAULT 'MXN'::"currency_enum" NOT NULL,
	"rate_ext_sell" numeric(5,2) DEFAULT '0' NOT NULL,
	"rate_interal_sell" numeric(5,2),
	"activo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alimento_ingrediente" ADD CONSTRAINT "alimento_ingrediente_alimento_id_alimento_id_fkey" FOREIGN KEY ("alimento_id") REFERENCES "alimento"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "alimento_ingrediente" ADD CONSTRAINT "alimento_ingrediente_ingredient_id_alimento_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "alimento"("id") ON DELETE RESTRICT;