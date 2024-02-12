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
        let strSQL: string = '' ;

        orgs.map((org, i) => {
            if(i === orgs.length - 1){
                strSQL += ` p.org_id = '${org.id}' `;
            }

            else{
                strSQL += ` p.org_id = '${org.id}' AND `;
            }
        });

        if(age !== ''){
            strSQL += `AND p.age = '${age}' `;
        }

        if(port !== ''){
            strSQL += `AND p.port = '${port}' `;
        }

        if(energy_level !== ''){
            strSQL += `AND p.energy_level = '${energy_level}' `;
        }

        if(environment !== ''){
            strSQL += `AND p.environment = '${environment}' `;
        }

        if(independecie_level !== ''){
            strSQL += `AND p.independencie_level = '${independecie_level}'`;
        }
        
        const pets = await prisma.$queryRawUnsafe<Pet[]>(`SELECT p.id, p.name, p.about, p.age, p.energy_level, 
            p.independencie_level, p.environment, p.port, p.created_at, p.org_id FROM pets p
             JOIN orgs o ON p.org_id = o.id AND ${strSQL}`);

        return pets;
    }
}