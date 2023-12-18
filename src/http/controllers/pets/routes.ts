import { FastifyInstance } from "fastify";
import { fetchPetById } from "./fetch-pet-by-id";

export async function petsRoutes(app: FastifyInstance){
    // middleware to check token
    app.get('/pet', fetchPetById);
}