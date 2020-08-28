import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import TableMovie from "./TableMovie";
import Image from "react-bootstrap/Image"

import "./BoxofficeList.css";

function Yearlyboxoffice(props) {
    const [yearlyList, setYearlyList] = useState([]);
    const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        setFetchedDataComplete(false)
        BoxOfficeService.getYearlyBoxOfficeList(props.year).then((list) => {
            setYearlyList(list);
            setFetchedDataComplete(true)
        });
    };

    useEffect(hook, [props.year]);
    let posizione = 0
    return (
        <>
            {!fetchedDataComplete ? (
                <Image src="/assets/loading_icon.svg" style={{ display: "flex", margin: "auto" }} />
            ) : yearlyList.length > 0 ? (
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
                            <TableMovie key={movie.id} movieProps={movie} tableType="year" posizione={posizione += 1} />
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
