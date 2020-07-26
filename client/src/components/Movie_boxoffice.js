import React, { useState, useEffect } from 'react'
import BoxOfficeService from '../services/boxoffice.js'

function Movie_boxoffice (props) {
    //console.log(props)
    const [movieInfo, setMovieInfo] = useState([])
    
    //when it loads, it should retrieve data of the movie from the db, like title and such
    
    const hook = () =>{
      BoxOfficeService
        .getMovieInfo(props.movie.movie)
        .then(movie =>{
            setMovieInfo(movie)
        })
    } 
    useEffect(hook,[]);
    
    return (
        <>
        {movieInfo.length > 0 ? <p>{movieInfo[1].titolo}</p> : <p>Loading movie...</p>}
      
      
      </>
    )
  }

  export default Movie_boxoffice