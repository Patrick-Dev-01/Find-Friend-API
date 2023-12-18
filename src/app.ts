import fastify from "fastify";
import { fastifyJwt } from '@fastify/jwt';
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { fastifyCookie } from "@fastify/cookie";
import { petsRoutes } from "./http/controllers/pets/routes";

const app = fastify();

app.register(orgsRoutes);
app.register(petsRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
});

// Setting cookie on app
app.register(fastifyCookie);

// Fastify Error Handler
app.setErrorHandler((error, request, reply) => {
    // Zod Validation Error
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