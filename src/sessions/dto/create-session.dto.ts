import { type SessionShape } from "@drizzle/session/schema";

export type CreateSessionType = Omit<SessionShape, 'id'|'createdAt' | 'refreshTokenHash'> & {
    refreshToken:string
} 