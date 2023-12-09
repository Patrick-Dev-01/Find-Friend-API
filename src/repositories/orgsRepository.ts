import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository{
    create(data: Prisma.OrgCreateManyInput): Promise<Org>;
    searchManyByUfCity(uf: string, city: string): Promise<Org[]>
    findByEmail(email: string): Promise<Org | null>
}