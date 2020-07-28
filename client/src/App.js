import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import Weekendboxoffice from "./components/Weekendboxoffice";
import Dailyboxoffice from "./components/Dailyboxoffice";
import MyNavbar from "./components/Navbar";
import MovieInfo from "./components/MovieInfo";

const MyNavbarWithRouter = withRouter(MyNavbar);

function App() {
  //SCHIFEZZE INCREDIBILI PER CALCOLARE DATA DI OGGI E DELLO SCORSO WEEKEND

  //TODAY DATE
  let date = new Date();
  date.setDate(date.getDate() - 1);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let giorno = ("0" + date.getDate()).slice(-2);
  let date_format = date.getFullYear() + "-" + month + "-" + giorno;

  //LAST WEEKEND DATE
  var diff =
    date.getDate() - (date.getDay() + 3) + (date.getDay() === 0 ? -6 : 1);
  let weekend_first = new Date();
  weekend_first.setDate(diff);
  let weekend_month = ("0" + (weekend_first.getMonth() + 1)).slice(-2);
  let weekend_giorno = ("0" + weekend_first.getDate()).slice(-2);
  let weekend_date_format =
    weekend_first.getFullYear() + "-" + weekend_month + "-" + weekend_giorno;

  //day sarebbe il giorno precedente a questo, essendo il boxoffice sempre dei giorni precedenti
  const [day, setDay] = useState(date_format);
  //weekend sarebbe il giorno di inizio dell-weekend che voglio cercare
  const [weekend, setWeekend] = useState(weekend_date_format);

  const handleButtonPrecedente = (event) => {
    //if its the button for day update day, else update weekend
    if (event.target.value === "day") {
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
    } else {
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
    }
    event.preventDefault();
  };

  const handleButtonSuccessivo = (event) => {
    if (event.target.value === "day") {
      let tomorrow = new Date(day);
      //check if the last checked date is today
      if (
        tomorrow.getDate() === date.getDate() &&
        tomorrow.getMonth() === date.getMonth() &&
        tomorrow.getFullYear() === date.getFullYear()
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
    } else {
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
        let next_weekend_month = ("0" + (next_weekend.getMonth() + 1)).slice(
          -2
        );
        let next_weekend_giorno = ("0" + next_weekend.getDate()).slice(-2);
        let next_weekend_date_format =
          next_weekend.getFullYear() +
          "-" +
          next_weekend_month +
          "-" +
          next_weekend_giorno;
        setWeekend(next_weekend_date_format);
      }
    }

    event.preventDefault();
  };

  return (
    <Router>
      {/*
      In questa pagina va creata una home page, magari con qualche news di film dall'internet
    <Dailyboxoffice day={day}/>
    <Weekendboxoffice weekendStart={weekendStart} />
    <BoxOfficeYear year={2020}/>
    <BoxOfficeAllTime/>
     */}
      <MyNavbarWithRouter />
      <Switch>
        <Route path="/daily">
          <Row id="buttonRow" fluid>
            <Button value="day" onClick={handleButtonPrecedente}>
              Precedente
            </Button>
            <h1 id="titolo_list">Incasso del giorno {day}</h1>
            <Button value="day" onClick={handleButtonSuccessivo}>
              Successivo
            </Button>
          </Row>
          <Dailyboxoffice day={day} />
        </Route>
        <Route path="/weekly">
          <Row id="buttonRow" fluid>
            <Button value="weekend" onClick={handleButtonPrecedente}>
              Precedente
            </Button>
            <h1 id="titolo_list"> Incasso del weekend {weekend} </h1>
            <Button value="weekend" onClick={handleButtonSuccessivo}>
              Successivo
            </Button>
          </Row>
          <Weekendboxoffice weekend={weekend} />
        </Route>
        <Route path="/yearly">
          <h1> yearly</h1>
        </Route>
        <Route path="/all-time">
          <h1> all-time</h1>
        </Route>
        <Route path="/">
          <h1> Home</h1>
        </Route>

        <Route exact path="/movie/:id" component={MovieInfo}></Route>
      </Switch>
    </Router>
  );
}

export default App;
