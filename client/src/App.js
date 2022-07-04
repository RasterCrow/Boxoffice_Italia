import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { withRouter } from "react-router";

import Weekendboxoffice from "./components/WeekendTable";
import Dailyboxoffice from "./components/DailyTable";
import Yearlyboxoffice from "./components/YearlyTable";
import AllTimeboxoffice from "./components/AllTimeTable";
import MyNavbar from "./components/Navbar";
import MovieInfo from "./components/MovieInfo";
import SearchPage from "./components/SearchPage";
import HomePage from "./components/Home";
import "./App.css";

const MyNavbarWithRouter = withRouter(MyNavbar);

function App() {
  return (
    <Router>
      <MyNavbarWithRouter />
      <Switch>
        <Route path="/daily" component={Dailyboxoffice} />
        <Route path="/weekly" component={Weekendboxoffice} />
        <Route path="/yearly" component={Yearlyboxoffice} />
        <Route path="/all-time" component={AllTimeboxoffice} />
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/movie/:id" component={MovieInfo}></Route>
      </Switch>
    </Router>
  );
}

export default App;
