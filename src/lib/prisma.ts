import { PrismaClient } from '@prisma/client';
import { env } from '../env/index';

const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
});

export { prisma }