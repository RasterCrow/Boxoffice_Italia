import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import YearlyMovie from "./YearlyMovie";
import "./BoxofficeList.css";

function Yearlyboxoffice(props) {
    const [yearlyList, setYearlyList] = useState([]);

    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        BoxOfficeService.getYearlyBoxOfficeList(props.year).then((list) => {
            setYearlyList(list);
            console.log(list)
        });
    };

    useEffect(hook, [props.year]);
    let posizione = 0
    return (
        <>
            {yearlyList.length > 0 ? (
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
                        </tr>
                    </thead>
                    <tbody>
                        {yearlyList.map((movie) => (
                            <YearlyMovie key={movie._id} movie={movie} posizione={posizione += 1} />
                        ))}
                    </tbody>
                </Table>
            ) : (
                    <h2>Non ho trovato dati per quest anno</h2>
                )}
        </>
    );
}

export default Yearlyboxoffice;
