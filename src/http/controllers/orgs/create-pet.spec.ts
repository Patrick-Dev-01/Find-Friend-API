import request from 'supertest';
import { it, describe, beforeAll, afterAll, expect } from 'vitest';
import { app } from '../../../app';

describe('Create Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Should create a pet', async () => {
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

        const response = await request(app.server).post('/pet').set('Authorization', `Bearer ${token}`).send({
            name: "Pet Teste 1",
            about: "Sobre o Pet 1",
            age: "filhote",
            port: "médio",
            energy_level: "Baixo",
            independencie_level: "Médio",
            environment: "Médio",
            org_id: 'Org 1',
        })

        expect(response.statusCode).toEqual(201);
    });
});