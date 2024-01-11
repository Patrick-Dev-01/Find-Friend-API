import { FastifyInstance } from "fastify";
import { fetchPetById } from "./fetch-pet-by-id";
import { fetchPets } from "./fetch-pets";

export async function petsRoutes(app: FastifyInstance){
    app.get('/pet/:id', fetchPetById);
    app.get('/pet', fetchPets);
}