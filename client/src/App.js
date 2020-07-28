import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import Weekendboxoffice from "./components/Weekendboxoffice";
import Dailyboxoffice from "./components/Dailyboxoffice";
import MyNavbar from "./components/Navbar";

const MyNavbarWithRouter = withRouter(MyNavbar);

function App() {
  //SCHIFEZZE INCREDIBILI PER CALCOLARE DATA DI OGGI E DELLO SCORSO WEEKEND

  let date = new Date();
  date.setDate(date.getDate() - 1);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let giorno = ("0" + date.getDate()).slice(-2);
  let date_format = date.getFullYear() + "-" + month + "-" + giorno;

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
  //weekendStart sarebbe il giorno di inizio dell-weekend che voglio cercare

  const [weekendStart, setWeekendStart] = useState(weekend_date_format);

  const handleButtonPrecedente = (event) => {
    let yesterday = new Date(day);
    yesterday.setDate(yesterday.getDate() - 1);
    let yesterday_month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    let yesterday_giorno = ("0" + yesterday.getDate()).slice(-2);
    let yesterday_date_format =
      yesterday.getFullYear() + "-" + yesterday_month + "-" + yesterday_giorno;
    setDay(yesterday_date_format);
    //event.preventDefault();
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
            <Button onClick={() => handleButtonPrecedente}>Precedente</Button>
            <h1 id="titolo_list">Incasso del giorno {day}</h1>
            <Button>Successivo</Button>
          </Row>
          <Dailyboxoffice day={day} />
        </Route>
        <Route path="/weekly">
          <Weekendboxoffice weekend={weekendStart} />
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
      </Switch>
    </Router>
  );
}

export default App;
