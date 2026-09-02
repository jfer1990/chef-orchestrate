
import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { supplier } from "../suppliers/schema";
import { addresses } from "../addresses/schema";

export const addressesSupplier = pgTable(
  "addresses_supplier",
  {
    id: serial("id").primaryKey(),
    supplierId: integer("supplier_id").notNull().references(() => supplier.id, { onDelete: "cascade" }),
    addressesId: integer("addesses_id").notNull().references(() => addresses.id, { onDelete: "cascade" }),
  }
);