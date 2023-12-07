import { Prisma, Org } from '@prisma/client';
import { OrgsRepository } from '../orgsRepository';
import { randomUUID } from 'node:crypto';

export class InMemoryOrgsRepository implements OrgsRepository{
    public items: Org[] = [];

    async findByEmail(email: string) {
        const org = this.items.find(org => org.email === email);

        if(!org){
            return null;
        }

        return org;
    }
    
    
    async create(data: Prisma.OrgCreateInput){
        const org = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            neighborhood: data.neighborhood,
            complement: data.complement,
            number: data.number,
            city: data.city,
            uf: data.uf,
        }

        this.items.push(org);

        return org;
    }
}