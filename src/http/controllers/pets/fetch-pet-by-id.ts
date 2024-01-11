import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository';
import { ResourceNotFoundError } from '../../../services/errors/resource-not-found-error';

export async function fetchPetById(request: FastifyRequest, reply: FastifyReply){
    const petSchema = z.object({
        id: z.string(),
    });

    const { id } = petSchema.parse(request.params);

    try {
        const prismaPetsRespository = new PrismaPetsRepository();

        const pet = await prismaPetsRespository.findById(id);

        return reply.status(200).send(pet);
        
    } catch (err) {
        if(err instanceof ResourceNotFoundError) return reply.status(400).send({ message: err.message });

        throw err;
    }
}