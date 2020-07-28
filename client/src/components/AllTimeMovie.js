import React from "react";
import { withRouter } from 'react-router'
import { useHistory } from "react-router-dom";

function AllTimeMovie({ movie, posizione }) {
    const history = useHistory();
    return (
        <>
            {movie !== "" ? (
                <tr onClick={(event) => history.push(`/movie/${movie.id}`)}>
                    <td>{posizione}</td>
                    <td>{movie.titolo}</td>
                    <td>{movie.dataUscita !== undefined ? ((("0" + new Date(movie.dataUscita).getDay()).slice(-2)) + "-" + (new Date(movie.dataUscita).getMonth() + 1) + "-" + new Date(movie.dataUscita).getFullYear()) : "Sconosciuto"}</td>

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

export default withRouter(AllTimeMovie);
