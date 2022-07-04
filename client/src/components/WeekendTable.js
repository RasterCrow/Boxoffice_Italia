import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import "./BoxofficeList.css";
import TableMovie from "./TableMovie";

function Weekendboxoffice(props) {
  //if I have a weekend date in the state ( I clicked on the MovieInfo Table on a specific date ) I load that table, otherwise it loads last weekend
  let weekend_first;
  let stateDate = props.location.state;
  if (stateDate !== undefined) {
    weekend_first = stateDate.weekend;
  } else {
    let date = new Date();
    let diff =
      date.getDate() - (date.getDay() + 3) + (date.getDay() === 0 ? -6 : 1);
    weekend_first = new Date();
    weekend_first.setDate(diff);
  }
  //Retrieve weekend in readable format
  let weekend_month = ("0" + (weekend_first.getMonth() + 1)).slice(-2);
  let weekend_giorno = ("0" + weekend_first.getDate()).slice(-2);
  let weekend_date_format =
    weekend_first.getFullYear() + "-" + weekend_month + "-" + weekend_giorno;

  const [weekendList, setWeekendList] = useState([]);
  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);
  //weekend sarebbe il giorno di inizio dell-weekend che voglio cercare
  const [weekend, setWeekend] = useState(weekend_date_format);

  //hook effect, loads everytime there is a rebuild with new weekend
  const hook = () => {
    setFetchedDataComplete(false);
    BoxOfficeService.getWeekendBoxOfficeList(weekend).then((list) => {
      setWeekendList(list);
      setFetchedDataComplete(true);
    });
  };
  useEffect(hook, [weekend]);

  const handleButtonPrecedente = (event) => {
    //if its the button for day update day, else update weekend
    let last_weekend = new Date(weekend);
    var diff =
      last_weekend.getDate() -
      (last_weekend.getDay() + 3) +
      (last_weekend.getDay() === 0 ? -6 : 1);
    last_weekend.setDate(diff);
    let last_weekend_month = ("0" + (last_weekend.getMonth() + 1)).slice(-2);
    let last_weekend_giorno = ("0" + last_weekend.getDate()).slice(-2);
    let last_weekend_date_format =
      last_weekend.getFullYear() +
      "-" +
      last_weekend_month +
      "-" +
      last_weekend_giorno;
    setWeekend(last_weekend_date_format);
    event.preventDefault();
  };

  const handleButtonSuccessivo = (event) => {
    let next_weekend = new Date(weekend);
    //check if its today
    if (
      next_weekend.getDate() === weekend_first.getDate() &&
      next_weekend.getMonth() === weekend_first.getMonth() &&
      next_weekend.getFullYear() === weekend_first.getFullYear()
    ) {
      //Gray out button maybe
      console.log("sono ad oggi");
    } else {
      //get next weekend, based on current one
      var diff =
        next_weekend.getDate() +
        (next_weekend.getDay() + 2) +
        (next_weekend.getDay() === 5 ? 0 : +6);
      next_weekend.setDate(diff);
      let next_weekend_month = ("0" + (next_weekend.getMonth() + 1)).slice(-2);
      let next_weekend_giorno = ("0" + next_weekend.getDate()).slice(-2);
      let next_weekend_date_format =
        next_weekend.getFullYear() +
        "-" +
        next_weekend_month +
        "-" +
        next_weekend_giorno;
      setWeekend(next_weekend_date_format);
    }

    event.preventDefault();
  };

  return (
    <>
      <Row id="buttonRow">
        <Button value="weekend" onClick={handleButtonPrecedente}>
          Precedente
        </Button>
        <h1 id="titolo_list">
          {" "}
          Incasso del weekend {weekend.split("-").reverse().join("-")}{" "}
        </h1>
        {weekend === weekend_date_format ? (
          <Button value="weekend" onClick={handleButtonSuccessivo} disabled>
            Successivo
          </Button>
        ) : (
          <Button value="weekend" onClick={handleButtonSuccessivo}>
            Successivo
          </Button>
        )}
      </Row>

      {!fetchedDataComplete ? (
        <Image
          src="/assets/loading_icon.svg"
          style={{ display: "flex", margin: "auto" }}
        />
      ) : weekendList.length > 0 ? (
        <Table
          className={"table-rounded"}
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
              <TableMovie
                key={movie.movie}
                movieProps={movie}
                tableType="weekend"
              />
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
