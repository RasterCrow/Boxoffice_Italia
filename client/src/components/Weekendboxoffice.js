import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";

import "./BoxofficeList.css";
import WeeklyMovie from "./WeeklyMovie";

function Weekendboxoffice(props) {
  const { weekend } = props;
  const [weekendList, setWeekendList] = useState([]);

  //hook effect, loads everytime there is a rebuild
  const hook = () => {
    BoxOfficeService.getWeekendBoxOfficeList(weekend).then((list) => {
      setWeekendList(list);
      //console.log(list)
    });
  };
  useEffect(hook, [props.weekend]);

  return (
    <>
      {weekendList.length > 0 ? (
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
              <th>Weekend in classifica</th>
            </tr>
          </thead>
          <tbody>
            {weekendList.map((movie) => (
              <WeeklyMovie key={movie.movie} movie={movie} />
            ))}
          </tbody>
        </Table>
      ) : (
        <h2>Non ho trovato dati per oggi</h2>
      )}
    </>
  );
}

export default Weekendboxoffice;
