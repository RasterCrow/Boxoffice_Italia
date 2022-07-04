import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

import TableMovie from "./TableMovie";
import "./BoxofficeList.css";

function DailyMovieInfo(props) {
  const { movieID } = props;

  const [dailyList, setDailyList] = useState([]);

  let indexPrec = 0;
  let incassoPrecedente = [1, 1, 1, 1, 1, 1, 1];

  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

  //hook effect, loads everytime there is a rebuild
  const hook = () => {
    setFetchedDataComplete(false);
    BoxOfficeService.getMovieDailyBoxOfficeList(movieID).then(async (list) => {
      setDailyList(list);
    });
  };

  useEffect(hook, [movieID, props.day]);

  return (
    <>
      {fetchedDataComplete ? (
        <Image src="/assets/loading_icon.svg" style={{ margin: "auto" }} />
      ) : dailyList.length > 0 ? (
        <Table
          id="tabellaDaily"
          striped
          bordered
          hover
          variant="dark"
          size="sm"
          className={"table-rounded"}
        >
          <thead>
            <tr>
              <th>Giorno</th>
              <th>Posizione</th>
              <th>Incasso dDf wDf</th>
              <th>Presenze</th>
              <th>Incasso ad oggi</th>
            </tr>
          </thead>
          <tbody>
            {dailyList.map((movie) => {
              let prevIndex = indexPrec - 1 < 0 ? 6 : indexPrec - 1;
              let prec = incassoPrecedente[prevIndex];
              let weekPrec = incassoPrecedente[indexPrec];
              let newIncassi = [...incassoPrecedente];
              newIncassi[indexPrec] = movie.incasso.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              });
              indexPrec = (indexPrec + 1) % 7;
              incassoPrecedente = newIncassi;
              return (
                <TableMovie
                  key={movie.id}
                  movieProps={movie}
                  tableType="movieInfoDay"
                  prec={prec}
                  weekPrec={weekPrec}
                />
              );
            })}
          </tbody>
        </Table>
      ) : (
        <>
          <Table
            id="tabellaDaily"
            striped
            bordered
            hover
            variant="dark"
            size="sm"
            className={"table-rounded"}
          >
            <thead>
              <tr>
                <th>Giorno</th>
                <th>Posizione</th>
                <th>Incasso</th>
                <th>Presenze</th>
                <th>Incasso ad oggi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">Non ho dati</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default DailyMovieInfo;
