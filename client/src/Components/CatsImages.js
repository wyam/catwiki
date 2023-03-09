import React from "react";

import "./CatImages.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function catsImages({breed, cats}) {
    return (
        <div className="catsImages">
            <h2>{breed}</h2>
            <ImageList sx={{ width: 500, height: 'inherit' }} cols={3} rowHeight={164}>
                {cats.map((cat) => (
                    <ImageListItem key={cat.id}>
                        <img
                            data-testid={cat.id}
                            alt={breed}
                            src={`${cat.image}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${cat.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default catsImages;