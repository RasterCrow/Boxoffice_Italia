import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router'
import { useHistory } from "react-router-dom";
import BoxOfficeService from "../services/boxoffice.js";

function DailyMovie(props) {
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
        <tr onClick={(event) => history.push(`/movie/${props.movie.movie}`)}>
          <td>{props.movie.posizioneClassifica}</td>
          <td>{movieInfo.titolo}</td>
          <td>{movieInfo.dataUscita !== undefined ? ((("0" + new Date(movieInfo.dataUscita).getDay()).slice(-2)) + "-" + (new Date(movieInfo.dataUscita).getMonth() + 1) + "-" + new Date(movieInfo.dataUscita).getFullYear()) : "Sconosciuto"}</td>
          <td>
            {props.movie.incasso.toLocaleString(
              undefined, // leave undefined to use the browser's locale,
              // or use a string like 'en-US' to override it.
              { minimumFractionDigits: 0 }
            )}
          </td>
          <td>
            {props.movie.presenze.toLocaleString(
              undefined, // leave undefined to use the browser's locale,
              // or use a string like 'en-US' to override it.
              { minimumFractionDigits: 0 }
            )}
          </td>
          <td>
            {props.movie.incassoTotaleAlGiorno.toLocaleString(
              undefined, // leave undefined to use the browser's locale,
              // or use a string like 'en-US' to override it.
              { minimumFractionDigits: 0 }
            )}
          </td>
        </tr>
      ) : (
          //maybe show loading icon
          <tr>
            <td>Loading movie...</td>
          </tr>
        )
      }
    </>
  );
}

export default withRouter(DailyMovie);
