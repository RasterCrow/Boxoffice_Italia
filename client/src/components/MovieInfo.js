import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image'
import BoxOfficeService from "../services/boxoffice.js";

function MovieInfo(props) {
  let movieID = props.match.params.id

  const [movieData, setMovieData] = useState(null)
  //when it loads, it should retrieve data of the movie from the db, like title and such

  const hook = () => {
    BoxOfficeService.getMovieInfoTMDB(movieID).then((movie) => {
      setMovieData(movie);
      console.log(movie)
    });
  };
  useEffect(hook, []);

  return (
    <>
      {movieData !== null ? (

        <Image src={"https://image.tmdb.org/t/p/w300" + movieData.poster_path}></Image>
      ) : (
          <p>Carico il film ...</p>
        )
      }
    </>

  );
}

export default MovieInfo;




