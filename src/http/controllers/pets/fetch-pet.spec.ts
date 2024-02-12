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
        const createdOrg = await request(app.server).post('/orgs').send({
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

        const { id } = createdOrg.body.org;

        const sessionResponse = await request(app.server).post('/session').send({
            email: 'orgEmail@teste1.com',
            password: '123',
        });

        const token = sessionResponse.body.token;

        await request(app.server).post('/pet').set('Authorization', `Bearer ${token}`).send({
            name: "Pet Teste",
            about: "Sobre o Pet Teste",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: `${id}`,
        });

        const petsResponse = await request(app.server).get('/pet').query({
            city: 'São Paulo',
            uf: 'SP',
            age: '',
            port: '',
            independencie_level: '',
            energy_level: '',
            environment: '',
        }).send();
    
        expect(petsResponse.body).toHaveLength(1);
    });
});