import React, { useState, useEffect } from 'react'
import BoxOfficeService from '../services/boxoffice.js'

import Movie_boxoffice from './Movie_boxoffice'

function Weekendboxoffice (props) {
    const { weekend } = props;
    const [weekendList, setWeekendList] = useState([])
    
    //hook effect, loads everytime there is a rebuild
    const hook = () =>{
      BoxOfficeService
        .getWeekendBoxOfficeList(weekend)
        .then(list =>{
            setWeekendList(list)
          //console.log(list)
        })
    } 
    useEffect(hook,[]);
  
    return (
        <>
            <h1 style={{textAlign:"center"}}> Incasso del weekend {weekend} </h1>

            {weekendList.length > 0 ?
                weekendList.map(movie =>
                    <Movie_boxoffice key={movie.movie} movie={movie}/>
                ) : <h2>Non ho trovato dati per oggi</h2>
            } 
        </>
    )
  }

  export default Weekendboxoffice