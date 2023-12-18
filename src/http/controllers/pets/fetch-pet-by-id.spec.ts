import request from 'supertest';
import { it, describe, beforeAll, afterAll, expect } from 'vitest';
import { app } from '../../../app';
import { object } from 'zod';

describe('Fetch Pet By Id (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Should Fetch Pet by Id', async () => {
        await request(app.server).post('/orgs').send({
            name: 'Org Name',
            email: 'orgEmail@teste.com',
            phone: '11999999999',
            password: '123',
            address: 'Endereço teste',
            cep: '00000001',
            city: 'Estado Teste',
            neighborhood: 'bairro Teste',
            complement: '',
            number: 1,
            uf: 'SP'
        });

        const orgResponse = await request(app.server).post('/session').send({
            email: 'orgEmail@teste.com',
            password: '123',
        });

        const token = orgResponse.body.token;

        const pet = await request(app.server).post('/pet').set('Authorization', `Bearer ${token}`).send({
            id: 'id_pet_1',
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: `org_id_1`,
        });

        const petResponse = await request(app.server).get('/pet').send('id_pet_1');

        expect(petResponse.body).toEqual(expect.objectContaining({
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: `${token.sub}`,
        }));
    });
});