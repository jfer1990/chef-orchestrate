import { Injectable, Inject } from "@nestjs/common";
import { DRIZZLE } from "@drizzle/drizzle.module";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CreateSessionType} from "@sessions/dto/create-session.dto";
import SessionEntity from '@sessions/entities/sessions.entity'; 
import { session } from "@drizzle/schematics/session/schema";
import Session from "@sessions/entities/sessions.entity"
import { and, eq, gt } from "drizzle-orm";
import { compare, hash } from "bcryptjs";


@Injectable()
export class SessionService{
    constructor(@Inject(DRIZZLE) private readonly db:NodePgDatabase){}
    async addNewSession(sessionData: CreateSessionType):Promise<SessionEntity>{
        const hashToken = await hash(sessionData.refreshToken,10); 
        const [newSession] = await this.db.insert(session).values({
            ...sessionData, 
            refreshTokenHash:hashToken
        }).returning(); 
        return newSession; 
    }

    async getValidSession(userId: number, refreshToken: string): Promise<Session | null>{
        const sessions = await this.db
            .select()
            .from(session)
            .where(and(
                eq(session.userId, userId), 
            ));

        console.log("sessions", sessions); 
        for (const currentSession of sessions) {
            if (await compare(refreshToken, currentSession.refreshTokenHash)) {
                return currentSession;
            }
        }

        return null;
    }

    async updateSessionToken(sessionId: number, hashToken:string){
        await this.db.update(session).set(
            {refreshTokenHash:hashToken}
        ).where(
            eq(session.id,sessionId)).returning()
    }

}
