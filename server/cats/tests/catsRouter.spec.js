const request = require('supertest');
const axios = require('axios');
jest.mock('axios');
const server = require('../../index');

afterAll(() => server.close());

describe('Cats Filter Endpoints', () => {
    it('should return status 400 when bad request on query params', async () => {
        const res = await request(server)
            .get('/api/v1/cats/filter?breed=123')
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({errors: [
            {
                location: 'query',
                msg: 'Only letters is allowed',
                param: 'breed',
                value: '123'
            }
        ]});
    });

    it('should return status 200 with result for specific cat breeds', async () => {
        axios.get.mockResolvedValueOnce({data: [
            {
                id: 'J2PmlIizw',
                url: 'https://cdn2.thecatapi.com/images/J2PmlIizw.jpg',
                width: 1080,
                height: 1350
            },
            {
                id: 'LSaDk6OjY',
                url: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
                width: 1080,
                height: 1080
            }
        ]});
        const res = await request(server)
            .get('/api/v1/cats/filter?breed=beng')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([
            { id: 'J2PmlIizw', image: 'https://cdn2.thecatapi.com/images/J2PmlIizw.jpg' },
            { id: 'LSaDk6OjY', image: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg' },
        ]);
    });

    it('should return error 500 error from api', async () => {
        axios.get.mockRejectedValueOnce(new Error('api failed!'));
        const res = await request(server)
            .get('/api/v1/cats/filter')
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({message: 'Internal error'});
    });
});