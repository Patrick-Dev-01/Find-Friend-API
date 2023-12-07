import { OrgsRepository } from "../repositories/orgsRepository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from 'bcryptjs';

interface RegisterServiceRequest{
    name: string;
    email: string;
    password: string;
    phone: string; 
    cep: string;
    address: string;
    neighborhood: string;
    complement: string;
    number: number;
    city: string;
    uf: string;
}

export class RegisterService{
    constructor(private orgsRepository: OrgsRepository){}

    async execute({ name, email, password, phone, cep, address, neighborhood, complement, number, city, uf }: RegisterServiceRequest){
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

        if(orgWithSameEmail){
            throw new OrgAlreadyExistsError();
        }

        // Generate password Hash
        const password_hash = await hash(password, 6);
        
        const org = await this.orgsRepository.create({
            name, email, password_hash, phone, cep, address, neighborhood, complement, number, city, uf 
        });

        return { org };
    }
}