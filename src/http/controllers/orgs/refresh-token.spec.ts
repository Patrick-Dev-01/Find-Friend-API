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

    it('Should be to able to refresh token', async () => {
        await request(app.server).post('/orgs').send({
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

        const authResponse = await request(app.server).post('/session').send({
            email: 'orgEmail@teste.com',
            password: '123',
        });

        const cookies = authResponse.get('Set-Cookie');

        const response = await request(app.server).patch('/token/refresh').set('Cookie', cookies).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    });
});