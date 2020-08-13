import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import ListGroup from "react-bootstrap/ListGroup"
import MovieCard from "./MovieCard"
import "./SearchPage.css";
function SearchPage(props) {
    const movie = props.location.state.movie
    const [similarMovieList, setSimilarMovieList] = useState([]);
    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        BoxOfficeService.getMovieByTitle(movie).then((list) => {
            setSimilarMovieList(list);

        });
    };
    useEffect(hook, [movie]);
    return (

        <div id='searchZone'>
            <h1>Film cercato : {movie}</h1>
            <ListGroup >
                {similarMovieList.map((movieFound) => (
                    <MovieCard key={movieFound.movieId} movieProps={movieFound} />
                ))}
            </ListGroup>
        </div>

    );
}

export default SearchPage;
