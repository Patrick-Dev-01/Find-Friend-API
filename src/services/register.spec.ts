import { it, describe, expect, beforeEach } from 'vitest';
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository';
import { RegisterService } from './register';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';
import { compare } from 'bcryptjs';

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterService;

describe('Register Org Service', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new RegisterService(orgsRepository);
    });

    it('Should register a org', async () => {
        const { org } = await sut.execute({
            name: 'Org Name',
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

        expect(org.id).toEqual(expect.any(String));
    });

    it('should not be able to register with same email twice', async () => {
        await sut.execute({
            name: 'Org Test 1',
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

        expect(async () => sut.execute({
            name: 'Org Test 2',
            email: 'orgEmail@teste.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste 2',
            cep: '00000002',
            city: 'Estado Teste 2',
            neighborhood: 'bairro Teste 2',
            complement: '',
            number: 2,
            uf: 'SP'
        })).rejects.toBeInstanceOf(OrgAlreadyExistsError);
    });

    it('Should hash the org password', async () => {
        const { org } = await sut.execute({
            name: 'Org Test 1',
            email: 'orgEmail@teste.com',
            phone: '11999999999',
            password: '123456',
            address: 'Endereço teste',
            cep: '00000001',
            city: 'Cidade teste',
            neighborhood: 'bairro Teste',
            complement: '',
            number: 1,
            uf: 'SP'
        });

        const isPasswordCorrectlyHashed = await compare('123456', org.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});