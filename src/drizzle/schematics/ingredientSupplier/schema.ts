import { pgTable, integer, serial, numeric, timestamp, index } from "drizzle-orm/pg-core";
import { currencyEnum, baseUnitEnum } from "@drizzle/constants/enums";
import { meal } from "../ingredientsMeals/schema";
import { supplier } from "../suppliers/schema";

export const mealSupplier = pgTable(
  "meal_supplier",
  {
    id: serial("id").primaryKey(),
    mealId: integer("meal_id").notNull().references(() => meal.id, { onDelete: "cascade" }),
    supplierId: integer("supplier_id").notNull().references(() => supplier.id, { onDelete: "cascade" }),
    price: numeric("price", { precision: 5, scale: 2 }),
    baseUnit: baseUnitEnum("base_unit").notNull(),
    quantity: numeric("quantity", { precision: 8, scale: 2 }).notNull(),
    currency: currencyEnum("currency").notNull().default("MXN"),
    updateAt: timestamp("update_at").notNull().defaultNow(),
  },
  (table) => ([
    index("meal_supplier_meal_id_idx").on(table.mealId),
    index("meal_supplier_supplier_id_idx").on(table.supplierId),
    index("meal_supplier_meal_supplier_idx").on(table.mealId, table.supplierId),
    index("meal_supplier_supplier_meal_idx").on(table.supplierId, table.mealId),
  ])
);