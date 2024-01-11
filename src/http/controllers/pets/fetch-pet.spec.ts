import request from 'supertest';
import { it, describe, beforeAll, afterAll, expect } from 'vitest';
import { app } from '../../../app';
import { object } from 'zod';

describe('Fetch Pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Should Fetch Pets By UF and City', async () => {
        await request(app.server).post('/orgs').send({
            name: 'Org Name 1',
            email: 'orgEmail@teste1.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste 1',
            cep: '00000001',
            city: 'São Paulo',
            neighborhood: 'bairro Teste 1',
            complement: '',
            number: 1,
            uf: 'SP'
        });

        await request(app.server).post('/orgs').send({
            name: 'Org Name 2',
            email: 'orgEmail@teste2.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste 2',
            cep: '00000001',
            city: 'São Paulo',
            neighborhood: 'bairro Teste 2',
            complement: '',
            number: 2,
            uf: 'SP'
        });

        await request(app.server).post('/orgs').send({
            name: 'Org Name 3',
            email: 'orgEmail@teste3.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste 3',
            cep: '00000001',
            city: 'Rio de Janeiro',
            neighborhood: 'Bairro Teste 3',
            complement: '',
            number: 3,
            uf: 'RJ'
        });

        const petsResponse = await request(app.server).get('/pet').query({
            city: 'São Paulo',
            uf: 'SP',
            age: '',
            port: '',
            independencie_level: '',
            energy_level: ''
        }).send();
    
        expect(petsResponse.body).toHaveLength(2);
    });
});