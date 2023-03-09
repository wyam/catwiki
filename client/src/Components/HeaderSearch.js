import React from "react";
import config from "../config.json";
import "./HeaderSearch.css";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import CatsImages from './CatsImages';

function HeaderSearch() {
    const [breeds, setBreeds] = React.useState(null);
    const [cats, setCats] = React.useState(null);
    const [selectedBreed, setSelectedBreed] = React.useState('');

    function fetchCatsImagesByBreed (event, newBreed) {
        if (newBreed) {
            setSelectedBreed(newBreed.label);
            fetch(`${config.apiHost}/api/v1/cats/filter?breed=${newBreed.id}`)
                .then((res) => res.json())
                .then((data) => setCats(data));
        }
    }

    React.useEffect(() => {
        fetch(`${config.apiHost}/api/v1/cats/breeds`)
            .then((res) => res.json())
            .then((data) => setBreeds(data));
    }, []);

    return (
        <div className="headerSearch">
            {breeds &&
                <Autocomplete
                    id="cats-breeds"
                    data-testid='autocomplete-cats-breeds'
                    onChange={fetchCatsImagesByBreed}
                    className="breedInput"
                    options={breeds}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Breeds" />}
                />
            }
            { selectedBreed && cats &&
                <CatsImages breed={selectedBreed} cats={cats} />
            }
        </div>
    );
}

export default HeaderSearch;