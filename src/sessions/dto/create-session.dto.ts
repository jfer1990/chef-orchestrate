import { type SessionShape } from "@drizzle/schematics/session/schema";

export type CreateSessionType = Omit<SessionShape, 'id'|'createdAt' | 'refreshTokenHash'> & {
    refreshToken:string
} 