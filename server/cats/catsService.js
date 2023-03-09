const { thecatapi } = require('./api/thecatapi');

const getCatsByBreed = async (breed) => {
    const cats = await thecatapi.searchByBreed(breed);
    if (cats) {
        return cats.map(cat => ({ id: cat.id, image: cat.url }));
    }
};

const getBreeds = async () => {
    const catsBreeds = await thecatapi.getBreeds();
    if (catsBreeds) {
        return catsBreeds.map(cat => ({ id: cat.id, label: cat.name }));
    }
}

module.exports = {
    getCatsByBreed,
    getBreeds
};