import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";

function MovieTableTr(props) {
  //console.log(props)
  const [movieInfo, setMovieInfo] = useState("");

  //when it loads, it should retrieve data of the movie from the db, like title and such

  const hook = () => {
    BoxOfficeService.getMovieInfo(props.movie.movie).then((movie) => {
      setMovieInfo(movie);
    });
  };
  useEffect(hook, []);

  /*

    <th>Posizione</th>
                  <th>Titolo</th>
                  <th>Incasso</th>
                  <th>Presenze</th>
                  <th>Incasso totale</th>
                  <th>Presenze totali</th>
                  */
  return (
    <>
      {movieInfo!=="" ? (
        <tr>
          <td>{props.movie.posizioneClassifica}</td>
          <td>{movieInfo.titolo}</td>
          <td>{props.movie.incasso}</td>
          <td>{props.movie.presenze}</td>
          <td>{props.movie.incassoTotaleAlGiorno}</td>
        </tr>
        
      ) : (
        //maybe show loading icon
        <tr>
          <td>Loading movie...</td>
        </tr>
      )}
    </>
  );
}

export default MovieTableTr;
