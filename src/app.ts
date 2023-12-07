import fastify from "fastify";
import { fastifyJwt } from '@fastify/jwt';
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { ZodError } from "zod";
import { env } from "./env";

const app = fastify();

app.register(orgsRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '60m'
    }
});

// Fastify Error Handler
app.setErrorHandler((error, request, reply) => {
    // Validation Error
    if(error instanceof ZodError){
        return reply.status(400).send({ message: 'Validation Issues', issues: error.format() });
    }

    if(env.NODE_ENV !== "production"){
        console.error(error);
    } else{

    }

    return reply.status(500).send({ message: "Internal Server error" });
});

export { app };