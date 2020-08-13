import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup"
import { useHistory } from "react-router-dom";
import "./SearchPage.css";

//Qui vorrei aggiungere una card per ogni film, ma dovrei fare una chiamata alle api di TMDB per recuperare l-immagine.
//Per ora mostro solo una lista

function MovieCard({ movieProps }) {
    console.log(movieProps)
    const history = useHistory();
    return (

        <ListGroup.Item id="MovieItem" onClick={(event) => history.push(`/movie/${movieProps.id}`)}>
            {movieProps.titolo}
        </ListGroup.Item>

    );
}

export default MovieCard;
