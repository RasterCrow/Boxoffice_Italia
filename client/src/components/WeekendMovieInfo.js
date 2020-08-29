import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import Table from "react-bootstrap/Table";

import "./BoxofficeList.css";
import TableMovie from "./TableMovie";

function WeekendMovieInfo(props) {
    let incassoPrecedente = 1;
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
                        {weekendList.map((movie) => {
                            let prec = incassoPrecedente
                            incassoPrecedente = movie.incassoWeekend.toLocaleString(
                                undefined, // leave undefined to use the browser's locale,
                                // or use a string like 'en-US' to override it.
                                { minimumFractionDigits: 0 }
                            )
                            return <TableMovie key={movie.id} movieProps={movie} tableType="movieInfoDayWeekend" prec={prec} />

                        })}
                    </tbody>
                </Table>
            ) : (
                    <>

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
                                <tr>
                                    <td colSpan="5">Non ho dati</td>
                                </tr>
                            </tbody>
                        </Table>

                    </>
                )
            }
        </>
    );
}

export default WeekendMovieInfo;
