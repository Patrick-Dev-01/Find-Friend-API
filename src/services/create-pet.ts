import { PetsRepository } from "../repositories/petsRepository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetServiceRequest{
    name: string;
    about: string;
    age: string;
    port: string;
    energy_level: string;
    independencie_level: string;
    environment: string;
    org_id: string
}

export class CreatePetService{
    constructor(private petsRepository: PetsRepository){}
    
    async execute(data: CreatePetServiceRequest){

        try {
            const pet = await this.petsRepository.create(data);

            return { pet };
        } 
        
        catch (err) {
            throw new ResourceNotFoundError();   
        }
    }
}