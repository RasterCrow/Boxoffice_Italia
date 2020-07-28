import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";

function YearlyMovie({ movie, posizione }) {
    //console.log(props)

    return (
        <>
            {movie !== "" ? (
                <tr>
                    <td>{posizione}</td>
                    <td>{movie.titolo}</td>
                    <td>{movie.dataUscita != undefined ? ((("0" + new Date(movie.dataUscita).getDay()).slice(-2)) + "-" + (new Date(movie.dataUscita).getMonth() + 1) + "-" + new Date(movie.dataUscita).getFullYear()) : "Sconosciuto"}</td>

                    <td>
                        {movie.incasso.toLocaleString(
                            undefined, // leave undefined to use the browser's locale,
                            // or use a string like 'en-US' to override it.
                            { minimumFractionDigits: 0 }
                        )}
                    </td>
                    <td>
                        {movie.presenze.toLocaleString(
                            undefined, // leave undefined to use the browser's locale,
                            // or use a string like 'en-US' to override it.
                            { minimumFractionDigits: 0 }
                        )}
                    </td>

                </tr>
            ) : (
                    //maybe show loading icon
                    <tr>
                        <td>Loading movie...</td>
                    </tr>
                )}
        </>
    );
}

export default YearlyMovie;
