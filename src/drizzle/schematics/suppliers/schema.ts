import { pgTable, serial,varchar, text } from "drizzle-orm/pg-core"

export const supplier = pgTable(
  "supplier",{
    id:serial("id").primaryKey(), 
    commercialName: varchar("commercial_name",{length:150}).notNull(),
    taxId:varchar("tax_id",{length:30}).notNull(), 
    email:text("email"), 
    phone1:text("phone1"), 
    phone2:text("phone2"),
    contactName:text("contact_name"),
  }
)