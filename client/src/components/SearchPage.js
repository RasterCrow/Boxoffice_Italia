import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import ListGroup from "react-bootstrap/ListGroup"
import Image from "react-bootstrap/Image"
import MovieCard from "./MovieCard"
import "./SearchPage.css";
function SearchPage(props) {
    const movie = props.location.state.movie
    const [similarMovieList, setSimilarMovieList] = useState([]);
    const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        setFetchedDataComplete(false)
        BoxOfficeService.getMovieByTitle(movie).then((list) => {
            setSimilarMovieList(list);
            setFetchedDataComplete(true)

        });
    };
    useEffect(hook, [movie]);
    return (
        <>
            {fetchedDataComplete ? (
                <>
                    <h1 id="titoloList">Film cercato : {movie}</h1>
                    <div id='searchZone' >

                        <ListGroup >
                            {similarMovieList.map((movieFound) => (
                                <MovieCard key={movieFound.movieId} movieProps={movieFound} />
                            ))}
                        </ListGroup>
                    </div>
                </>
            ) : (
                    <Image src="/assets/loading_icon.svg" style={{ display: "flex", margin: "auto" }} />
                )
            }
        </>
    );
}

export default SearchPage;
