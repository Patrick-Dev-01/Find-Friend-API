import 'dotenv/config';
import { Environment } from 'vitest';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generate database URL for E2E tests
function generaDatabaseURL(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error('Please provide a DATABASE_URL environment variable');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    async setup(){
        const schema = randomUUID();
        const databaseURL = generaDatabaseURL(schema);
        
        // set env variable to generated URL
        process.env.DATABASE_URL = databaseURL;
        
        execSync('npx prisma migrate deploy');
        
        return {
            // after complete tests, drop the schemas
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
            }
        }
    },
    transformMode: 'ssr',    
}