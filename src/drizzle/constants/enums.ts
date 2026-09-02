import { pgEnum } from "drizzle-orm/pg-core";

const baseUnitEnum = pgEnum("base_unit_enum", [
  "g",       
  "ml",      
  "unidad",  // 
]);

const currencyEnum = pgEnum("currency_enum", [
  "MXN",
  "USD",
  "EUR",
  "GTQ",
  "COP",
  "ARS",
]);

export {baseUnitEnum, currencyEnum}
