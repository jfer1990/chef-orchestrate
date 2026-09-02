import 'dotenv/config'; 
import {defineConfig} from 'drizzle-kit'; 

const DB_URL = process.env.DATABASE_URL || ''; 

export default defineConfig({
    dialect:'postgresql',
    schema: ['./src/drizzle/**/schema.ts','./src/drizzle/**/enums.ts'], 
    out:'./drizzle', 
    dbCredentials:{
        url: DB_URL,
    }
}); 