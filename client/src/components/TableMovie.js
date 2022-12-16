import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import BoxOfficeService from "../services/boxoffice.js";
import "./BoxofficeList.css";
function TableMovie(props) {
  const { movieProps, tableType, posizione, prec, weekPrec } = props;
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
            <td className="posizioneClassifica">
              {movieProps.posizioneClassifica}
            </td>
            <td className="titolo">
              {isInLast7Days(movieInfo.dataUscita) ? (
                <>
                  <span style={{ color: "red", marginRight: "8px" }}>
                    (New Entry)
                  </span>
                  {movieInfo.titolo}
                </>
              ) : (
                <div className="td-titolo">{movieInfo.titolo}</div>
              )}
            </td>
            <td className="dataUscita">
              {movieInfo.dataUscita !== undefined
                ? ("0" + new Date(movieInfo.dataUscita).getDate()).slice(-2) +
                  "-" +
                  ("0" + (new Date(movieInfo.dataUscita).getMonth() + 1)).slice(
                    -2
                  ) +
                  "-" +
                  new Date(movieInfo.dataUscita).getFullYear()
                : "Sconosciuto"}
            </td>
            <td className="incasso">
              {movieProps.incasso.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="presenze">
              {movieProps.presenze.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="weekendTotaleAlGiorno">
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
            <td colSpan="6">Loading movie...</td>
          </tr>
        )}
      </>
    );
  } else if (tableType === "weekend") {
    return (
      <>
        {movieInfo !== "" ? (
          <tr onClick={(event) => history.push(`/movie/${movieProps.movie}`)}>
            <td className="posizioneClassifica">
              {movieProps.posizioneClassificaWeekend}
            </td>
            <td className="titolo">{movieInfo.titolo}</td>
            <td className="dataUscita">
              {movieInfo.dataUscita !== undefined
                ? ("0" + new Date(movieInfo.dataUscita).getDate()).slice(-2) +
                  "-" +
                  ("0" + (new Date(movieInfo.dataUscita).getMonth() + 1)).slice(
                    -2
                  ) +
                  "-" +
                  new Date(movieInfo.dataUscita).getFullYear()
                : "Sconosciuto"}
            </td>

            <td className="incasso">
              {parseInt(movieProps.incassoWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="presenze">
              {parseInt(movieProps.presenzeWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="weekendNumero">{movieProps.weekendNumero}</td>
          </tr>
        ) : (
          //maybe show loading icon
          <tr>
            <td colSpan="6">Loading movie...</td>
          </tr>
        )}
      </>
    );
  } else if (tableType === "year" || tableType === "all-time") {
    return (
      <>
        {movieProps !== "" ? (
          <tr onClick={(event) => history.push(`/movie/${movieProps.id}`)}>
            <td className="posizioneClassifica">{posizione}</td>
            <td className="titolo">{movieProps.titolo}</td>
            <td className="dataUscita">
              {movieProps.dataUscita !== undefined
                ? ("0" + new Date(movieProps.dataUscita).getDate()).slice(-2) +
                  "-" +
                  (
                    "0" +
                    (new Date(movieProps.dataUscita).getMonth() + 1)
                  ).slice(-2) +
                  "-" +
                  new Date(movieProps.dataUscita).getFullYear()
                : "Sconosciuto"}
            </td>

            <td className="incasso">
              {movieProps.incasso.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="presenze">
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
            <td colSpan="5">Loading movie...</td>
          </tr>
        )}
      </>
    );
  } else if (tableType === "movieInfoDay") {
    let isWeekend = false;
    movieProps.giorno !== undefined
      ? (isWeekend =
          new Date(movieProps.giorno).getDay() === 5 ||
          new Date(movieProps.giorno).getDay() === 6 ||
          new Date(movieProps.giorno).getDay() === 0)
      : (isWeekend = false(
          ("0" + new Date(movieProps.giorno).getDate()).slice(-2) +
            "/" +
            ("0" + (new Date(movieProps.giorno).getMonth() + 1)).slice(-2) +
            "/" +
            new Date(movieProps.giorno).getFullYear()
        ));

    return (
      <>
        {movieProps !== "" ? (
          <tr
            onClick={(event) =>
              history.push({
                pathname: "/daily",
                state: { giorno: new Date(movieProps.giorno) },
              })
            }
          >
            <td className="posizioneClassifica">
              {movieProps.posizioneClassifica}
            </td>
            {isWeekend ? (
              <td className="giorno" style={{ color: "orange" }}>
                {movieProps.giorno !== undefined
                  ? ("0" + new Date(movieProps.giorno).getDate()).slice(-2) +
                    "/" +
                    ("0" + (new Date(movieProps.giorno).getMonth() + 1)).slice(
                      -2
                    ) +
                    "/" +
                    new Date(movieProps.giorno).getFullYear()
                  : "Sconosciuto"}
              </td>
            ) : (
              <td className="giorno">
                {movieProps.giorno !== undefined
                  ? ("0" + new Date(movieProps.giorno).getDate()).slice(-2) +
                    "/" +
                    ("0" + (new Date(movieProps.giorno).getMonth() + 1)).slice(
                      -2
                    ) +
                    "/" +
                    new Date(movieProps.giorno).getFullYear()
                  : "Sconosciuto"}
              </td>
            )}

            <td className="incassoDaily">
              <div
                style={{
                  display: "flex",
                  flexBasis: "33.333333%",
                  justifyContent: "space-evenly",
                }}
              >
                {movieProps.incasso.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
                {/* daily difference*/}
                {parseInt(prec.toString().replace(/,/g, "")) === 1 ? (
                  <span style={{ textAlign: "center" }}>n/a</span>
                ) : (
                  <span
                    style={{
                      textAlign: "center",
                      color:
                        parseInt(prec.toString().replace(/,/g, "")) <
                        parseInt(movieProps.incasso)
                          ? "#3366ff"
                          : "red",
                    }}
                  >
                    {getPercentageChange(
                      parseInt(prec.toString().replace(/,/g, "")),
                      parseInt(movieProps.incasso)
                    ).toString()}
                    %
                  </span>
                )}
                {/* weekly day difference*/}
                {parseInt(weekPrec.toString().replace(/,/g, "")) === 1 ? (
                  <span
                    style={{
                      textAlign: "center",
                    }}
                  >
                    n/a
                  </span>
                ) : (
                  <span
                    style={{
                      textAlign: "center",
                      color:
                        parseInt(weekPrec.toString().replace(/,/g, "")) <
                        parseInt(movieProps.incasso)
                          ? "#3366ff"
                          : "red",
                    }}
                  >
                    {getPercentageChange(
                      parseInt(weekPrec.toString().replace(/,/g, "")),
                      parseInt(movieProps.incasso)
                    ).toString()}
                    %
                  </span>
                )}
              </div>
            </td>
            <td className="presenze">
              {movieProps.presenze.toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="weekendTotaleAlGiorno">
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
        )}
      </>
    );
  } else if (tableType === "movieInfoDayWeekend") {
    return (
      <>
        {movieProps !== "" ? (
          <tr
            onClick={(event) =>
              history.push({
                pathname: "/weekly",
                state: { weekend: new Date(movieProps.inizioWeekend) },
              })
            }
          >
            <td className="posizioneClassifica">
              {movieProps.posizioneClassificaWeekend}
            </td>
            <td className="weekend">
              {("0" + new Date(movieProps.inizioWeekend).getDate()).slice(-2) +
                "/" +
                (
                  "0" +
                  (new Date(movieProps.inizioWeekend).getMonth() + 1)
                ).slice(-2) +
                " - " +
                ("0" + new Date(movieProps.fineWeekend).getDate()).slice(-2) +
                "/" +
                ("0" + (new Date(movieProps.fineWeekend).getMonth() + 1)).slice(
                  -2
                )}
            </td>
            <td className="incassoWeekend">
              {parseInt(prec.toString().replace(/,/g, "")) === 1 ? (
                <>
                  <div>
                    {movieProps.incassoWeekend.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}
                    <span style={{ marginLeft: "8px", color: "#3366ff" }}>
                      100%
                    </span>
                  </div>
                </>
              ) : parseInt(prec.toString().replace(/,/g, "")) <
                parseInt(movieProps.incassoWeekend) ? (
                <>
                  <div>
                    {movieProps.incassoWeekend.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}
                    <span style={{ marginLeft: "8px", color: "#3366ff" }}>
                      {getPercentageChange(
                        parseInt(prec.toString().replace(/,/g, "")),
                        parseInt(movieProps.incassoWeekend)
                      ).toString()}
                      %
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {movieProps.incassoWeekend.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}
                    <span style={{ marginLeft: "8px", color: "red" }}>
                      {getPercentageChange(
                        parseInt(prec.toString().replace(/,/g, "")),
                        parseInt(movieProps.incassoWeekend)
                      ).toString()}
                      %
                    </span>
                  </div>
                </>
              )}
            </td>
            <td className="presenze">
              {parseInt(movieProps.presenzeWeekend).toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
              )}
            </td>
            <td className="weekendNumero">{movieProps.weekendNumero}</td>
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

function getPercentageChange(oldNumber, newNumber) {
  //console.log("oldnumber: " + oldNumber)
  //console.log("newNumber: " + newNumber)
  var decreaseValue = newNumber - oldNumber;
  //console.log(parseInt((decreaseValue / oldNumber) * 100))
  return parseInt((decreaseValue / oldNumber) * 100);
}

function isInLast7Days(date) {
  let date1 = new Date(date);
  let date2 = new Date();
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays <= 7) return true;
  else return false;
}
export default withRouter(TableMovie);
