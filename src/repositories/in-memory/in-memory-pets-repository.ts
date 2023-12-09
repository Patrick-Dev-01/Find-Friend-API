import { Org, Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository{
    public items: Pet[] = []; 

    async create(data: Prisma.PetUncheckedCreateInput){
        const pet = {
            id: randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            port: data.port,
            energy_level: data.energy_level,
            independencie_level: data.independencie_level,
            environment:  data.environment,
            created_at: new Date(),
            org_id: data.org_id
        };

        this.items.push(pet);

        return pet;
    }

    async findById(id: string){
        const pet = this.items.find(pet => pet.id === id);

        if(!pet){
            return null;
        }
        
        return pet;
    }

    async searchMany(orgs: Org[], age?: string, port?: string, energy_level?: string, independecie_level?: string, environment?: string){
        let pets: Pet[] = [];
        orgs.map(org => {
            this.items.filter(pet => pet.org_id === org.id).map(pet => {
                pets.push(pet);
            });
        });

        if(age !== "" || port !== "" || energy_level !== "" || independecie_level !== "" || environment !== ""){
            return pets.filter(pet => 
                pet.age === age || 
                pet.port === port ||
                pet.energy_level === energy_level ||
                pet.independencie_level === independecie_level ||
                pet.environment === environment
            )
        }

        else{
            return pets;
        }
    }
}