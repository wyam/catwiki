const { thecatapi } = require('./api/thecatapi');

const getCatsByBreed = async (breed) => {
    const cats = await thecatapi.searchByBreed(breed);
    if (cats) {
        return cats.map(cat => ({ id: cat.id, image: cat.url }));
    }
};

module.exports = {
    getCatsByBreed
};