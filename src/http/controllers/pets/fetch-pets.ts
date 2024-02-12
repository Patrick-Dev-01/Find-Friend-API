import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository';
import { ResourceNotFoundError } from '../../../services/errors/resource-not-found-error';
import { PrismaOrgsRepository } from '../../../repositories/prisma/prisma-orgs-repository';

export async function fetchPets(request: FastifyRequest, reply: FastifyReply){
    const fetchPetsSchema = z.object({
        city: z.string(),
        uf: z.string(),
        age: z.string().default(''),
        port: z.string().default(''),
        independencie_level: z.string().default(''),
        energy_level: z.string().default(''),
        environment: z.string().default('')
    });

    const { city, uf, age, port, independencie_level, energy_level, environment } = fetchPetsSchema.parse(request.query);

    try {
        const prismaOrgsRepository = new PrismaOrgsRepository();
        const prismaPetsRespository = new PrismaPetsRepository();

        const orgs = await prismaOrgsRepository.searchManyByUfCity(uf, city);
        
        if(orgs.length == 0){
            return reply.status(400).send({ Error: "There's no Pets in this UF and City" })
        }

        const pets = await prismaPetsRespository.searchMany(orgs, age, port, independencie_level, energy_level, environment);

        return reply.status(200).send(pets);
        
    } catch (err) {
        if(err instanceof ResourceNotFoundError) return reply.status(400).send({ message: err.message });

        throw err;
    }
}