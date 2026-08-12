import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DRIZZLE = Symbol('drizzle-connection'); //This tells nest how to look for the DB connection since this is not a class but a returned json object from drizzle
@Module({
    imports: [ConfigModule],
    providers:[
        {
            provide:DRIZZLE, 
            inject: [ConfigService], 
            useFactory: async(configService: ConfigService)=>{
                const databaseURL = configService.get<string>("DATABASE_URL"); 
                const pool = new Pool({connectionString:databaseURL}); 
                return drizzle({ client: pool });
            }
        } 

    ], 
    exports:[DRIZZLE]
})
export class DrizzleModule {}
