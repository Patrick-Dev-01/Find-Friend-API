import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { AuthenticateService } from "../../../services/authenticate";
import { InvalidCredentialsError } from "../../../services/errors/invalid-credentials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const orgRepository = new PrismaOrgsRepository();
        const authenticateService = new AuthenticateService(orgRepository);
        
        const { org } = await authenticateService.execute({ email, password });

        // create token
        const token = await reply.jwtSign(
            {
                sign: {
                    sub: org.id
                }
            }
        )

        return reply.status(200).send({ token });

    } catch (err) {
        if(err instanceof InvalidCredentialsError) return reply.status(400).send({ message: err.message });

        throw err;
    }
}