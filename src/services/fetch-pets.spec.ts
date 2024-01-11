import { it, describe, expect, beforeEach } from 'vitest';
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';
import { RegisterService } from './register';
import { FetchPetsService } from './fetch-pets';

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsService;

describe('Fetch Pets Service', () => {
    beforeEach(async () => {
        orgsRepository = new InMemoryOrgsRepository();
        petsRepository = new InMemoryPetsRepository();
        sut = new FetchPetsService(orgsRepository, petsRepository);

        const registerService = new RegisterService(orgsRepository);

        const { org } = await registerService.execute({
            name: 'Org Teste 1',
            email: 'orgEmail@teste.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste',
            cep: '00000001',
            city: 'Cidade teste',
            neighborhood: 'bairro Teste',
            complement: '',
            number: 1,
            uf: 'SP'
        });

        for (let i = 0; i < 6; i++) {
            if(i % 2 === 0){
                await petsRepository.create({
                    name: `Pet Teste ${i}`,
                    about: `Sobre o Pet ${i}`,
                    age: "filhote",
                    port: "pequeno",
                    energy_level: "medio",
                    independencie_level: "alto",
                    environment: "grande",
                    org_id: `${org.id}`,
                });    
            }

            else{
                await petsRepository.create({
                    name: `Pet Teste ${i}`,
                    about: `Sobre o Pet ${i}`,
                    age: "adulto",
                    port: "medio",
                    energy_level: "alto",
                    independencie_level: "baixo",
                    environment: "medio",
                    org_id: `${org.id}`,
                });
            }
        }
    });

    it('Should fetch pets by UF and City', async () => {  
        const pets = await sut.execute({ 
            uf: 'SP', city: 'Cidade teste', age: '', port: '', energy_level: '', independecie_level: '', environment: '' 
        });

        expect(pets).toHaveLength(6);
    });

    it('Should fetch pets by age', async () => {
        const pets = await sut.execute({ 
            uf: 'SP', city: 'Cidade teste', age: 'filhote', port: '', energy_level: '', independecie_level: '', environment: '' 
        });

        expect(pets).toHaveLength(3);
    });

    it('Should fetch pets by port', async () => {
        const pets = await sut.execute({ 
            uf: 'SP', city: 'Cidade teste', age: '', port: 'pequeno', energy_level: '', independecie_level: '', environment: '' 
        });

        expect(pets).toHaveLength(3);
    });

    it('Should fetch pets by energy_level', async () => {
        const pets = await sut.execute({ 
            uf: 'SP', city: 'Cidade teste', age: '', port: '', energy_level: 'medio', independecie_level: '', environment: '' 
        });

        expect(pets).toHaveLength(3);
    });

    it('Should fetch pets by independecie_level', async () => {
        const pets = await sut.execute({ 
            uf: 'SP', city: 'Cidade teste', age: '', port: '', energy_level: '', independecie_level: 'baixo', environment: '' 
        });

        expect(pets).toHaveLength(3);
    });

    it('Should fetch pets by environment', async () => {
        const pets = await sut.execute({ 
            uf: 'SP', city: 'Cidade teste', age: '', port: '', energy_level: '', independecie_level: '', environment: 'grande' 
        });

        expect(pets).toHaveLength(3);
    });

    it('Should fetch a pet with multiple filters', async () => {
        const registerService = new RegisterService(orgsRepository);

        const { org } = await registerService.execute({
            name: 'Org Teste 2',
            email: 'orgEmail@teste2.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste 2',
            cep: '00000002',
            city: 'Estado Teste 2',
            neighborhood: 'bairro Teste 2',
            complement: '',
            number: 2,
            uf: 'RJ'
        });

        await petsRepository.create({
            name: `Pet Teste 7`,
            about: `Sobre o Pet 7`,
            age: "adulto",
            port: "medio",
            energy_level: "alto",
            independencie_level: "alto",
            environment: "grande",
            org_id: `${org.id}`,
        });

        const pets = await sut.execute({ 
            uf: 'RJ', city: 'Estado Teste 2', age: 'adulto', port: 'medio', energy_level: 'alto', independecie_level: 'alto', environment: 'grande' 
        });
        
        expect(pets).toHaveLength(1);
    });
});