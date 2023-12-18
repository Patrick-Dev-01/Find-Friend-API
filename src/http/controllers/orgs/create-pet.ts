import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";

export async function createPet(request: FastifyRequest, reply: FastifyReply){
    const createPetSchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        port: z.string(),
        energy_level: z.string(),
        independencie_level: z.string(),
        environment: z.string(),
        org_id: z.string(),
    });

    const { name, about, age, port, energy_level, independencie_level, 
        environment, org_id
    } = createPetSchema.parse(request.body);

    try {
        const prismaPetsRespository = new PrismaPetsRepository();

        await prismaPetsRespository.create({ name, about, age, port, energy_level, independencie_level, environment, org_id  })
    } catch (err) {
        
    }

    reply.status(201).send({ message: "Success Authenticated" });
}