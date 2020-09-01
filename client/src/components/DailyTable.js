import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import DatePicker from "react-date-picker";

import TableMovie from "./TableMovie";
import "./BoxofficeList.css";

function Dailyboxoffice(props) {
  let date
  let stateDate = props.location.state

  if (stateDate !== undefined) {
    date = stateDate.giorno
    window.history.replaceState(null, '')
  } else {
    date = new Date();
    date.setDate(date.getDate() - 1);
  }
  //DAY RECEIVED DATE
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let giorno = ("0" + date.getDate()).slice(-2);
  let full_year = date.getFullYear();
  let date_format = full_year + "-" + month + "-" + giorno;
  //TODAY DATE ( used for buttons)
  let date_today = new Date();
  date_today.setDate(date_today.getDate() - 1);
  let month_today = ("0" + (date_today.getMonth() + 1)).slice(-2);
  let giorno_today = ("0" + date_today.getDate()).slice(-2);
  let full_year_today = date_today.getFullYear();
  let date_format_today = full_year_today + "-" + month_today + "-" + giorno_today;

  //day sarebbe il giorno precedente a questo, essendo il boxoffice sempre dei giorni precedenti
  const [day, setDay] = useState(date_format);

  const [dailyList, setDailyList] = useState([]);
  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

  //hook effect, loads everytime there is a rebuild
  const hook = () => {

    BoxOfficeService.getDailyBoxOfficeList(day).then(async (list) => {
      setDailyList(list);

      setFetchedDataComplete(true);
    });


  };

  useEffect(hook, [day]);

  const handleButtonPrecedente = (event) => {
    //if its the button for day update day, else update weekend
    let yesterday = new Date(day);
    yesterday.setDate(yesterday.getDate() - 1);
    let yesterday_month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    let yesterday_giorno = ("0" + yesterday.getDate()).slice(-2);
    let yesterday_date_format =
      yesterday.getFullYear() +
      "-" +
      yesterday_month +
      "-" +
      yesterday_giorno;
    setDay(yesterday_date_format);

    event.preventDefault();
  };

  const handleButtonSuccessivo = (event) => {
    let tomorrow = new Date(day);
    //check if the last checked date is today
    if (
      tomorrow.getDate() === date_today.getDate() &&
      tomorrow.getMonth() === date_today.getMonth() &&
      tomorrow.getFullYear() === date_today.getFullYear()
    ) {
      //I don't update date anymore.
      //maybe show gray button
    } else {
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tomorrow_month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
      let tomorrow_giorno = ("0" + tomorrow.getDate()).slice(-2);
      let tomorrow_date_format =
        tomorrow.getFullYear() + "-" + tomorrow_month + "-" + tomorrow_giorno;
      setDay(tomorrow_date_format);
    }
    event.preventDefault();
  };

  const handleChangePickerDate = (newDate) => {
    let newDate_month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let newDate_giorno = ("0" + newDate.getDate()).slice(-2);
    let newDate_format =
      newDate.getFullYear() + "-" + newDate_month + "-" + newDate_giorno;
    setDay(newDate_format);
  };

  return (
    <>
      <Row id="buttonRow">
        <Button value="day" onClick={handleButtonPrecedente}>
          Precedente
            </Button>
        <div id="titolo_list">
          <h1>Incasso del giorno {day}</h1>
          <DatePicker
            clearIcon={null}
            maxDate={new Date(date_format_today)}
            onChange={handleChangePickerDate}
            value={new Date(day)}
          />
        </div>
        {day === date_format_today ? (
          <Button value="day" onClick={handleButtonSuccessivo} disabled>
            Successivo
          </Button>
        ) : (
            <Button value="day" onClick={handleButtonSuccessivo}>
              Successivo
            </Button>
          )}
      </Row>
      {!fetchedDataComplete ? (
        <Image src="/assets/loading_icon.svg" style={{ display: "flex", margin: "auto" }} />
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
