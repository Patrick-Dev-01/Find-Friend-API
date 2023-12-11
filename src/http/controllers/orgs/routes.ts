import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { createPet } from "./create-pet";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refreshToken } from "./refresh-token";

export async function orgsRoutes(app: FastifyInstance){
    app.post('/orgs', register);
    app.post('/session', authenticate);

    app.patch('/token/refresh', refreshToken);
    
    // middleware to check token
    app.post('/pet', {onRequest: [verifyJWT]}, createPet);
}