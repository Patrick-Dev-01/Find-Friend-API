import { it, describe, expect, beforeEach } from 'vitest';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';
import { FetchPetByIdService } from './fetch-pet-by-id';

let petsRepository: InMemoryPetsRepository;
let sut: FetchPetByIdService;

describe('Search Pet by id Service', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();
        sut = new FetchPetByIdService(petsRepository);
    });

    it('Should return a pet by id', async () => {
        const createdPet = await petsRepository.create({
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: "Org 1",
        });

        const { pet } = await sut.execute({ id: createdPet.id });

        expect(pet).toEqual(expect.objectContaining({ name: 'Pet Teste 1' }));
    });
});