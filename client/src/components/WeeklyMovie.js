import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import BoxOfficeService from "../services/boxoffice.js";

function WeeklyMovie(props) {
  //console.log(props)
  const [movieInfo, setMovieInfo] = useState("");
  const history = useHistory();

  //when it loads, it should retrieve data of the movie from the db, like title and such
  const hook = () => {
    BoxOfficeService.getMovieInfo(props.movie.movie).then((movie) => {
      setMovieInfo(movie);
    });
  };
  useEffect(hook, []);

  return (
    <>
      {movieInfo !== "" ? (
        <tr>
          <td>{props.movie.posizioneClassificaWeekend}</td>
          <td>
            <Link to={`/movie/${movieInfo.id}`}>{movieInfo.titolo}</Link>
          </td>
          <td>
            {parseInt(props.movie.incassoWeekend).toLocaleString(
              undefined, // leave undefined to use the browser's locale,
              // or use a string like 'en-US' to override it.
              { minimumFractionDigits: 2 }
            )}
          </td>
          <td>
            {parseInt(props.movie.presenzeWeekend).toLocaleString(
              undefined, // leave undefined to use the browser's locale,
              // or use a string like 'en-US' to override it.
              { minimumFractionDigits: 2 }
            )}
          </td>
          <td>{props.movie.weekendNumero}</td>
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

export default WeeklyMovie;
