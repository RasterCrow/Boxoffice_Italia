import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";

import "./BoxofficeList.css";
import TableMovie from "./TableMovie";

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
              <TableMovie key={movie.movie} movieProps={movie} tableType="weekend" />
            ))}
          </tbody>
        </Table>
      ) : (
          <h1 style={{ textAlign: "center", marginTop: "100px" }}>
            Non ho trovato dati per questo giorno
          </h1>
        )}
    </>
  );
}

export default Weekendboxoffice;
