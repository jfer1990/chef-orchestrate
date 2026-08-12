import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; 

export const DRIZZLE = Symbol('drizzle-connection'); 
@Module({
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
