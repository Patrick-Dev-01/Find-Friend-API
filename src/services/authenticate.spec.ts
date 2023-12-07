import { it, describe, expect, beforeEach } from 'vitest';
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository';
import { hash } from 'bcryptjs';
import { AuthenticateService } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateService;

describe('Authenticate Org Service', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new AuthenticateService(orgsRepository);
    });

    it('should authenticate Org', async () => {
        await orgsRepository.create({
            name: 'Org Test 1',
            email: 'orgEmail@teste.com',
            phone: '11999999999',
            password_hash: await hash('123', 6),
            address: 'Endereço teste',
            cep: '00000001',
            city: 'Estado Teste',
            neighborhood: 'bairro Teste',
            complement: '',
            number: 1,
            uf: 'SP'
        });

        const { org } = await sut.execute({
            email: 'orgEmail@teste.com',
            password: '123'
        });

        expect(org.id).toEqual(expect.any(String));
    });

    it('should Invalidate the Org Authentication', async () => {
        await orgsRepository.create({
            name: 'Org Test 1',
            email: 'orgEmail@teste.com',
            phone: '11999999999',
            password_hash: await hash('123', 6),
            address: 'Endereço teste',
            cep: '00000001',
            city: 'Estado Teste',
            neighborhood: 'bairro Teste',
            complement: '',
            number: 1,
            uf: 'SP'
        });

        expect(async () => sut.execute({
            email: 'orgEmail@teste.com',
            password: '12'
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});