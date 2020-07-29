import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import TableMovie from "./TableMovie";
import "./BoxofficeList.css";

function AllTimeboxoffice() {
    const [allTimeList, setallTimeList] = useState([]);

    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        BoxOfficeService.getAllTimeBoxOfficeList().then((list) => {
            setallTimeList(list);
        });
    };

    useEffect(hook, []);
    let posizione = 0
    return (
        <>
            {allTimeList.length > 0 ? (
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
                        {allTimeList.map((movie) => (
                            <TableMovie key={movie.id} movieProps={movie} tableType="all-time" posizione={posizione += 1} />
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

export default AllTimeboxoffice;
