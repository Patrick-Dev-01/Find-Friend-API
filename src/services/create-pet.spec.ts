import { it, describe, expect, beforeEach } from 'vitest';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';
import { CreatePetService } from './create-pet';

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetService;

describe('Create pet Service', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();
        sut = new CreatePetService(petsRepository);
    });

    it('Should create a pet', async () => {
        const { pet } = await sut.execute({
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: 'Org 1',
        });

        expect(pet.id).toEqual(expect.any(String));
    });
});