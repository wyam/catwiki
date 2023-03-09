const axios = require('axios');
jest.mock('axios');
const { API_HOST, thecatapi } = require('../../api/thecatapi');

describe('thecatapi', () => {
    it('should search by breed and return results', async () => {
        // given
        const cats = [
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
            },
        ];
        axios.get.mockResolvedValueOnce({data: cats});

        //when
        const catsBeng = await thecatapi.searchByBreed('beng');

        //then
        expect(axios.get).toHaveBeenCalledWith(`${API_HOST}/images/search?limit=10&breed_ids=beng`);
        expect(catsBeng).toBe(cats);
    });

    it('should return default result if no breed specify', async () => {
        // given
        const cats = [
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
            },
        ];
        axios.get.mockResolvedValueOnce({data: cats});

        //when
        const catsBeng = await thecatapi.searchByBreed();

        //then
        expect(axios.get).toHaveBeenCalledWith(`${API_HOST}/images/search?limit=10`);
        expect(catsBeng).toBe(cats);
    });

    it('should return undefined when api failed', async () => {
        // given
        axios.get.mockRejectedValueOnce(new Error('api failed!'));
        // when
        const error = await thecatapi.searchByBreed('failed');
        // then
        expect(error).toBeUndefined();
    });
})