import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import DailyMovie from "./DailyMovie";
import "./BoxofficeList.css";
function Dailyboxoffice(props) {
  const [dailyList, setDailyList] = useState([]);
  const { day } = props;
  //hook effect, loads everytime there is a rebuild
  const hook = () => {
    BoxOfficeService.getDailyBoxOfficeList(day).then((list) => {
      setDailyList(list);
    });
  };

  useEffect(hook, [props.day]);

  return (
    <>
      {dailyList.length > 0 ? (
        <Table
          id="tabellaDaily"
          striped
          bordered
          hover
          responsive="md"
          variant="dark"
        >
          <thead>
            <tr>
              <th>Posizione</th>
              <th>Titolo</th>
              <th>Data Uscita</th>
              <th>Incasso</th>
              <th>Presenze</th>
              <th>Incasso ad oggi</th>
            </tr>
          </thead>
          <tbody>
            {dailyList.map((movie) => (
              <DailyMovie key={movie.movie} movie={movie} />
            ))}
          </tbody>
        </Table>
      ) : (
          <h2>Non ho trovato dati per questo giorno</h2>
        )}
    </>
  );
}

export default Dailyboxoffice;
