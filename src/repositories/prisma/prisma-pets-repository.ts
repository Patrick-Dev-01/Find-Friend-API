import { Org, Pet, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PetsRepository } from "../petsRepository";

export class PrismaPetsRepository implements PetsRepository{
    async create(data: Prisma.PetUncheckedCreateInput){
        const pet = await prisma.pet.create({ data })

        return pet;
    }
    
    async findById(id: string){
        const pet = await prisma.pet.findFirst({
            where: {
                id
            }
        });

        if(!pet){
            return null;
        }

        return pet;
    }

    async searchMany(orgs: Org[], age?: string, port?: string, energy_level?: string, independecie_level?: string, environment?: string) {
        let strSQL: string = `SELECT *FROM pets as p JOIN orgs as o WHERE`;

        orgs.map((org, i) => {
            if(i === orgs.length - 1){
                strSQL += ` p.org_id = ${org.id} `;
            }

            else{
                strSQL += ` p.org_id = ${org.id} AND `;
            }
        });

        strSQL += `AND p.age = ${age} AND p.port = ${port} AND p.energy_level = ${energy_level} 
            AND p.independecie_level = ${independecie_level} AND p.environment = ${environment}`;

        console.log(strSQL)
        
        const pets = await prisma.$queryRaw<Pet[]>`${strSQL}`;

        return pets;
    }
}