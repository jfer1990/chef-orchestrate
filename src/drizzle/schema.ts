import {
    pgTable, 
    pgEnum, 
    serial, 
    timestamp, 
    text, 
    integer, 
    real, 
    primaryKey, 
    varchar,
    boolean,
    uuid
} from 'drizzle-orm/pg-core'; 
import { InferSelectModel } from 'drizzle-orm';

export const Users = pgTable('users',{
    id:serial('id').primaryKey(), 
    name: text('name').notNull(), 
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}); 

