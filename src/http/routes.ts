import { FastifyInstance } from "fastify";
import { register } from "./controllers/orgs/register";
import { authenticate } from "./controllers/orgs/authenticate";
import { verifyJWT } from "./middlewares/verify-jwt";
import { createPet } from "./controllers/orgs/create-pet";

export async function appRoutes(app: FastifyInstance){
    app.post('/orgs', register);
    app.post('/session', authenticate);
    // middleware to check token
    app.post('/pet', {onRequest: [verifyJWT]}, createPet);
}