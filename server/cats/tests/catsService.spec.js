const catsService = require('../catsService');
const { thecatapi } = require('../api/thecatapi');

describe('catsService', () => {
    it('should call api to get results of cats by breed', async () => {
        // given
        const spySearchByBreed = jest.spyOn(thecatapi, 'searchByBreed');
        spySearchByBreed.mockResolvedValueOnce([
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
        ]);
        // when
        const catsResult = await catsService.getCatsByBreed('beng');
        // then
        expect(catsResult).toEqual([
            {
                id: 'J2PmlIizw',
                image: 'https://cdn2.thecatapi.com/images/J2PmlIizw.jpg',
            },
            {
                id: 'LSaDk6OjY',
                image: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
            },
        ]);
    });

    it('should return empty result when api return empty value', async () => {
        // given
        const spySearchByBreed = jest.spyOn(thecatapi, 'searchByBreed');
        spySearchByBreed.mockResolvedValueOnce([]);
        // when
        const catsResult = await catsService.getCatsByBreed('beng');
        // then
        expect(catsResult).toEqual([]);
    });

    it('should return undefined when error on api', async () => {
        // given
        const spySearchByBreed = jest.spyOn(thecatapi, 'searchByBreed');
        spySearchByBreed.mockResolvedValueOnce();
        // when
        const catsResult = await catsService.getCatsByBreed('beng');
        // then
        expect(catsResult).toBeUndefined();
    });
})