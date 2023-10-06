import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BoxOfficeProvider } from "./services/BoxOfficeContext";

ReactDOM.render(
  <BoxOfficeProvider>
    <App />
  </BoxOfficeProvider>,
  document.getElementById("root")
);
