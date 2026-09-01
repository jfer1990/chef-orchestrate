import { DrizzleModule } from "@drizzle/drizzle.module";
import { Module } from "@nestjs/common";
import { SessionService } from "@sessions/sessions.service";

@Module({
    imports:[DrizzleModule],
    providers:[SessionService],
    exports:[SessionService]
})

export class SessionsModule{}