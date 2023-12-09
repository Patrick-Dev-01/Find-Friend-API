import { Prisma } from "@prisma/client";
import { PetsRepository } from "../petsRepository";

export class PrismaPetsRepository implements PetsRepository{
    async create(data: Prisma.PetCreateInput): Promise<{ id: string; name: string; about: string; age: number; energy_level: string; independencie_level: string; environment: string; created_at: Date; org_id: string; }> {
        throw new Error("Method not implemented.");
    }
    async searchById(id: string): Promise<{ id: string; name: string; about: string; age: number; energy_level: string; independencie_level: string; environment: string; created_at: Date; org_id: string; }> {
        throw new Error("Method not implemented.");
    }
    async searchMany(state: string, city: string, age?: string | undefined, port?: string | undefined, energy_level?: string | undefined, independecie_level?: string | undefined, environment?: string | undefined): Promise<{ id: string; name: string; about: string; age: number; energy_level: string; independencie_level: string; environment: string; created_at: Date; org_id: string; }[] | null> {
        throw new Error("Method not implemented.");
    }

}