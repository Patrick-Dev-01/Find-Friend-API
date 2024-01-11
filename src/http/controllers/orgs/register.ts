import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterService } from "../../../services/register";
import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { OrgAlreadyExistsError } from "../../../services/errors/org-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerOrgSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string().max(11).min(11),
        cep: z.string().max(8).min(8),
        address: z.string(),
        neighborhood: z.string(),
        complement: z.string(),
        number: z.number(),
        city: z.string(),
        uf: z.string().max(2).min(2),
    });

    const { name, email, password, phone, cep, address, 
            neighborhood, complement, number, 
            city, uf 
        } = registerOrgSchema.parse(request.body);

    try {
        const prismaOrgRepository = new PrismaOrgsRepository();
        const registerService = new RegisterService(prismaOrgRepository);

        const org = await registerService.execute({ name, email, password, phone, cep, address, neighborhood, complement, number, city, uf })

        return reply.status(201).send(org);
    } 
    
    catch (err) {
        if(err instanceof OrgAlreadyExistsError) return reply.status(409).send({ message: err.message });

        throw err;
    }
}