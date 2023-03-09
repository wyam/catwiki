const axios = require('axios');

const API_HOST = `https://api.thecatapi.com/v1`

const thecatapi = {
    searchByBreed: (breed) => {
        return axios.get(`${API_HOST}/images/search?limit=10${breed ? '&breed_ids=' + breed : '' }`)
            .then(res => res.data)
            .catch(err => console.log('Error: ', err.message));
    }
};
module.exports = {
    API_HOST,
    thecatapi
};