import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";


import TableMovie from "./TableMovie";
import "./BoxofficeList.css";

function Dailyboxoffice(props) {
  const { day } = props;

  const [dailyList, setDailyList] = useState([]);
  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

  //hook effect, loads everytime there is a rebuild
  const hook = () => {
    setFetchedDataComplete(false);
    BoxOfficeService.getDailyBoxOfficeList(day).then(async (list) => {
      setDailyList(list);
      console.log(list)
    });
  };

  useEffect(hook, [props.day]);

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
              <TableMovie key={movie.movie} movieProps={movie} tableType="day" />
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

export default Dailyboxoffice;
