import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository{
    async findByEmail(email: string){
        const org = await prisma.org.findFirst({
            where: {
                email
            }
        });

        if(!org){
            return null;
        }

        return org;
    }
    async create(data: Prisma.OrgCreateInput){
        const org = await prisma.org.create({ data });

        return org;
    }
}