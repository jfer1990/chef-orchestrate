import { pgTable,serial, text, geometry } from "drizzle-orm/pg-core";

export const addresses = pgTable('addresses', {
  id: serial().primaryKey(),
  lineOne: text('line_one').notNull(),
  lineTwo: text('line_two'),
  city: text().notNull(),
  state: text(),
  postalCode: text('postal_code').notNull(),
  country: text().notNull(),
  location: geometry('location', { type: 'point', mode: 'xy' }).notNull(),
});