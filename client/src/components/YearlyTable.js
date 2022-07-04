import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import TableMovie from "./TableMovie";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import "./BoxofficeList.css";

function Yearlyboxoffice() {
  //This year
  let date = new Date();
  date.setDate(date.getDate() - 1);
  let full_year = date.getFullYear();

  const [yearlyList, setYearlyList] = useState([]);
  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);
  //anno da caricare
  const [year, setYear] = useState(full_year);

  //hook effect, loads everytime there is a rebuild
  const hook = () => {
    setFetchedDataComplete(false);
    BoxOfficeService.getYearlyBoxOfficeList(year).then((list) => {
      setYearlyList(list);
      setFetchedDataComplete(true);
    });
  };

  useEffect(hook, [year]);

  const handleButtonPrecedente = (event) => {
    setYear(year - 1);
    event.preventDefault();
  };

  const handleButtonSuccessivo = (event) => {
    if (year !== full_year) {
      setYear(year + 1);
    } else {
    }

    event.preventDefault();
  };

  let posizione = 0;
  return (
    <>
      <Row id="buttonRow">
        <Button value="year" onClick={handleButtonPrecedente}>
          Precedente
        </Button>
        <h1 id="titolo_list"> Incasso dell'anno {year} </h1>
        {year === full_year ? (
          <Button value="year" onClick={handleButtonSuccessivo} disabled>
            Successivo
          </Button>
        ) : (
          <Button value="year" onClick={handleButtonSuccessivo}>
            Successivo
          </Button>
        )}
      </Row>
      {!fetchedDataComplete ? (
        <Image
          src="/assets/loading_icon.svg"
          style={{ display: "flex", margin: "auto" }}
        />
      ) : yearlyList.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {yearlyList.map((movie) => (
              <TableMovie
                key={movie.id}
                movieProps={movie}
                tableType="year"
                posizione={(posizione += 1)}
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

export default Yearlyboxoffice;
