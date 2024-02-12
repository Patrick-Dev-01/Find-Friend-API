import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository{
    async searchManyByUfCity(uf: string, city: string){
        const orgs = await prisma.org.findMany({
            where: {
                uf: uf,
                city: city
            }
        });
        
        if(orgs.length == 0){
            return [];
        }

        else{
            return orgs;
        }
    }

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