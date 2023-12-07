import { compare } from "bcryptjs";
import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateServiceRequest{
    email: string;
    password: string;
}

export class AuthenticateService{
    constructor(private orgsRepository: PrismaOrgsRepository){}

    async execute({ email, password }: AuthenticateServiceRequest){
        const org = await this.orgsRepository.findByEmail(email);

        if(!org){
            throw new InvalidCredentialsError();
        }

        const passwordDoesMatch = await compare(password, org.password_hash);

        if(!passwordDoesMatch){
            throw new InvalidCredentialsError();
        }

        return { org };
    }
}