import { OrgsRepository } from "../repositories/orgsRepository";
import { PetsRepository } from "../repositories/petsRepository";
import { UnspectedError } from "./errors/unspected-Error";

interface FetchPetsRequest{
    uf: string; 
    city: string; 
    age?: string; 
    port?: string; 
    energy_level?: string; 
    independecie_level?: string; 
    environment?: string;
}

export class FetchPetsService{
    constructor(
        private orgsRepository: OrgsRepository,
        private petsRepository: PetsRepository
    ){}
    
    async execute({ uf, city, age, port, energy_level, independecie_level, environment }: FetchPetsRequest){
        try {
            const orgs = await this.orgsRepository.searchManyByUfCity(uf, city);
            const pets = await this.petsRepository.searchMany(orgs, age, port, energy_level, independecie_level, environment);

            return pets;
        } 
        
        catch (err) {
            throw new UnspectedError();
        }
    }
}