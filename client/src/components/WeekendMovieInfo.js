import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";

import "./BoxofficeList.css";
import TableMovie from "./TableMovie";

function WeekendMovieInfo(props) {
    const { movieID } = props;
    const [weekendList, setWeekendList] = useState([]);

    //hook effect, loads everytime there is a rebuild
    const hook = () => {
        BoxOfficeService.getMovieWeekendBoxOfficeList(movieID).then((list) => {
            setWeekendList(list);
            //console.log(list)
        });
    };
    useEffect(hook, [props.weekend]);

    return (
        <>
            {weekendList.length > 0 ? (
                <Table
                    id="tabellaDaily"
                    striped
                    bordered
                    hover

                    variant="dark"
                    size="sm"
                >
                    <thead>
                        <tr>
                            <th>Weekend</th>
                            <th>Posizione</th>
                            <th>Incasso</th>
                            <th>Presenze</th>
                            <th>Weekend in classifica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekendList.map((movie) => (
                            <TableMovie key={movie.id} movieProps={movie} tableType="movieInfoDayWeekend" />
                        ))}
                    </tbody>
                </Table>
            ) : (
                    <h2 style={{ textAlign: "center", marginTop: "100px" }}>
                        Non ci sono dati dell'weekend
                    </h2>
                )}
        </>
    );
}

export default WeekendMovieInfo;
