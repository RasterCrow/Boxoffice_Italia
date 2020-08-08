import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";


import TableMovie from "./TableMovie";
import "./BoxofficeList.css";

function DailyMovieInfo(props) {
    const { movieID } = props;

    const [dailyList, setDailyList] = useState([]);
    const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        setFetchedDataComplete(false);
        BoxOfficeService.getMovieDailyBoxOfficeList(movieID).then(async (list) => {

            setDailyList(list);
        });
    };

    useEffect(hook, [props.day]);

    return (
        <>
            {fetchedDataComplete ? (
                <Image src="/assets/loading_icon.svg" style={{ margin: "auto" }} />
            ) : dailyList.length > 0 ? (
                <Table
                    id="tabellaDaily"
                    striped
                    bordered
                    hover
                    responsive="lg"
                    variant="dark"
                    size="sm"
                >
                    <thead>
                        <tr>
                            <th>Giorno</th>
                            <th>Posizione</th>
                            <th>Incasso</th>
                            <th>Presenze</th>
                            <th>Incasso ad oggi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyList.map((movie) => (
                            <TableMovie key={movie.id} movieProps={movie} tableType="movieInfoDay" />
                        ))}
                    </tbody>
                </Table>
            ) : (
                        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
                            Non ci sono dati dei giorni
                        </h2>
                    )}
        </>
    );
}

export default DailyMovieInfo;
