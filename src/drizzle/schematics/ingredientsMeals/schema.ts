import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  numeric,
  boolean,
  timestamp,
  integer,
  unique,
  doublePrecision,
  check,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { baseUnitEnum, currencyEnum } from "@drizzle/constants/enums";



export const meal = pgTable("meal", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),

  baseUnit: baseUnitEnum("base_unit").notNull(),
  cost: numeric("cost", { precision: 8, scale: 2 })
    .notNull()
    .default("0"),
  currency: currencyEnum("currency").notNull().default("MXN"),
  rateExtSell: numeric("rate_ext_sell", { precision: 5, scale: 2 })
    .notNull()
    .default("0"),
  rateIntSell: numeric("rate_interal_sell", { precision: 5, scale: 2 }),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const mealIngredient = pgTable(
  "meal_ingredient",
  {
    id: serial("id").primaryKey(),
    mealId: integer("meal_id")
      .notNull()
      .references(() => meal.id, { onDelete: "cascade" }),
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => meal.id, { onDelete: "restrict" }),
    quantity: numeric("quantity", { precision: 12, scale: 3 }).notNull(),
    measureUnit: baseUnitEnum("measure_unit").notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    unique("uq_receta").on(table.mealId, table.ingredientId),
    check(
      "chk_no_auto_referencia",
      sql`${table.mealId} <> ${table.ingredientId}`
    ),
  ]
);

