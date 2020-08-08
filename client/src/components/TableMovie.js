import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router'
import { useHistory } from "react-router-dom";
import BoxOfficeService from "../services/boxoffice.js";

function TableMovie(props) {
  const { movieProps, tableType, posizione } = props
  //console.log(props)
  const [movieInfo, setMovieInfo] = useState("");
  const history = useHistory();

  //when it loads, it should retrieve data of the movie from the db, like title and such

  const hook = () => {
    if (tableType === "day" || tableType === "weekend") {
      BoxOfficeService.getMovieInfo(movieProps.movie).then((movie) => {
        setMovieInfo(movie);
      });
    }
  };
  useEffect(hook, []);


  if (tableType === "day") {
    return (
      <>
        {movieInfo !== "" ? (
          <tr onClick={(event) => history.push(`/movie/${movieProps.movie}`)}>
            <td>{movieProps.posizioneClassifica}</td>
            <td>{movieInfo.titolo}</td>
            <td>{movieInfo.dataUscita !== undefined ? ((("0" + new Date(movieInfo.dataUscita).getDay()).slice(-2)) + "-" + (new Date(movieInfo.dataUscita).getMonth() + 1) + "-" + new Date(movieInfo.dataUscita).getFullYear()) : "Sconosciuto"}</td>
            <td>
              {movieProps.incasso.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {movieProps.presenze.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {movieProps.incassoTotaleAlGiorno.toLocaleString(
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
  } else if (tableType === "weekend") {
    return (
      <>
        {movieInfo !== "" ? (
          <tr onClick={(event) => history.push(`/movie/${movieProps.movie}`)}>
            <td>{movieProps.posizioneClassificaWeekend}</td>
            <td>{movieInfo.titolo}</td>
            <td>{movieInfo.dataUscita !== undefined ? ((("0" + new Date(movieInfo.dataUscita).getDay()).slice(-2)) + "-" + (new Date(movieInfo.dataUscita).getMonth() + 1) + "-" + new Date(movieInfo.dataUscita).getFullYear()) : "Sconosciuto"}</td>

            <td>
              {parseInt(movieProps.incassoWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {parseInt(movieProps.presenzeWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>{movieProps.weekendNumero}</td>
          </tr>
        ) : (
            //maybe show loading icon
            <tr>
              <td>Loading movie...</td>
            </tr>
          )}
      </>
    );
  } else if (tableType === "year" || tableType === "all-time") {
    return (
      <>
        {movieProps !== "" ? (
          <tr onClick={(event) => history.push(`/movie/${movieProps.id}`)}>
            <td>{posizione}</td>
            <td>{movieProps.titolo}</td>
            <td>{movieProps.dataUscita !== undefined ? ((("0" + new Date(movieProps.dataUscita).getDay()).slice(-2)) + "-" + (new Date(movieProps.dataUscita).getMonth() + 1) + "-" + new Date(movieProps.dataUscita).getFullYear()) : "Sconosciuto"}</td>

            <td>
              {movieProps.incasso.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {movieProps.presenze.toLocaleString(
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

  } else if (tableType === "movieInfoDay") {
    let isWeekend = false
    movieProps.giorno !== undefined ? isWeekend = ((new Date(movieProps.giorno).getDay() === 5) || (new Date(movieProps.giorno).getDay() === 6) || (new Date(movieProps.giorno).getDay() === 0)) : isWeekend = false
    return (
      <>
        {movieProps !== "" ? (
          <tr onClick={(event) => history.push(`/movie/${movieProps.movie}`)}>
            {isWeekend ?
              <td style={{ color: "orange" }}>{movieProps.giorno !== undefined ? ((new Date(movieProps.giorno).getDate()) + "-" + (new Date(movieProps.giorno).getMonth() + 1) + "-" + new Date(movieProps.giorno).getFullYear()) : "Sconosciuto"}</td>
              :
              <td>{movieProps.giorno !== undefined ? ((new Date(movieProps.giorno).getDate()) + "-" + (new Date(movieProps.giorno).getMonth() + 1) + "-" + new Date(movieProps.giorno).getFullYear()) : "Sconosciuto"}</td>
            }

            <td>{movieProps.posizioneClassifica}</td>
            <td>
              {movieProps.incasso.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {movieProps.presenze.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {movieProps.incassoTotaleAlGiorno.toLocaleString(
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
  } else if (tableType === "movieInfoDayWeekend") {

    return (
      <>
        {movieProps !== "" ? (

          <tr onClick={(event) => history.push(`/movie/${movieProps.movie}`)}>
            <td>{(new Date(movieProps.inizioWeekend).getDate()) + "-" + (new Date(movieProps.inizioWeekend).getMonth() + 1) + " / " + (new Date(movieProps.fineWeekend).getDate()) + "-" + (new Date(movieProps.fineWeekend).getMonth() + 1)}</td>
            <td>{movieProps.posizioneClassificaWeekend}</td>
            <td>
              {parseInt(movieProps.incassoWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>
              {parseInt(movieProps.presenzeWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td>{movieProps.weekendNumero}</td>
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
}

export default withRouter(TableMovie);
