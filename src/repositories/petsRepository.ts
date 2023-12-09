import { Org, Pet, Prisma } from "@prisma/client";

export interface PetsRepository{
    searchMany(orgs: Org[], age?: string, port?: string, energy_level?: string, independecie_level?: string, environment?: string): Promise <Pet[] | null>
    findById(id: string): Promise <Pet | null>;
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}