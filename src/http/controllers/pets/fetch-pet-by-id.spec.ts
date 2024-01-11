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
        const createdOrg = await request(app.server).post('/orgs').send({
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

        const { id } = createdOrg.body.org;

        const sessionResponse = await request(app.server).post('/session').send({
            email: 'orgEmail@teste.com',
            password: '123',
        });

        const token = sessionResponse.body.token;

        const createdPet = await request(app.server).post('/pet').set('Authorization', `Bearer ${token}`).send({
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: `${id}`,
        });

        const petResponse = await request(app.server).get(`/pet/${createdPet.body.id}`).send();

        expect(petResponse.body).toEqual(expect.objectContaining({
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: `${id}`,
        }));
    });
});