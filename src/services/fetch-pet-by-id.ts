import { PetsRepository } from "../repositories/petsRepository";
import { UnspectedError } from "./errors/unspected-Error";

interface FetchPetByIdRequest{
    id: string
}

export class FetchPetByIdService{
    constructor(private petRepository: PetsRepository){}
    
    async execute({ id }: FetchPetByIdRequest){
        try {
            const pet = await this.petRepository.findById(id);

            return { pet };
        } 
        
        catch (err) {
            throw new UnspectedError();
        }
    }
}