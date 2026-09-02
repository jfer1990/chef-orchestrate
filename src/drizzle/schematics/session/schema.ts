import { 
    index,
    pgTable,
    serial,
    text,
    boolean,
    timestamp,
    integer
 } from "drizzle-orm/pg-core";
 import { InferSelectModel  } from 'drizzle-orm'; 
 import { users } from "@drizzle/schematics/users/schema";

export const session = pgTable('session',{
    id: serial('id').primaryKey(), 
    userId: integer('user_id').notNull().references(()=> users.id,{onDelete:'cascade'}), 
    refreshTokenHash: text('refresh_token_hash').notNull(), 
    deviceType:text('device_type'), 
    expiresAt:timestamp('expires_at'), 
    isActive:boolean('is_active'), 
    createdAt:timestamp('created_at').notNull().defaultNow(),
    },
    (table) => ([
    index("session_user_id_idx").on(table.userId),
    index("session_user_active_idx").on(table.userId, table.isActive),
    ])
)

export type SessionShape = InferSelectModel<typeof session>;




