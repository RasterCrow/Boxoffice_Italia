import React, { useState, useEffect } from 'react'
import BoxOfficeService from '../services/boxoffice.js'

import Movie_boxoffice from './Movie_boxoffice'
function Dailyboxoffice (props) {
    const [dailyList, setDailyList] = useState([])
    
    //hook effect, loads everytime there is a rebuild
    const hook = () =>{
      BoxOfficeService
        .getDailyBoxOfficeList(props.day)
        .then(list =>{
          setDailyList(list)
          //console.log(list)
        })
    } 
    useEffect(hook,[]);
  
    return (
        <>
            <h1 style={{textAlign:"center"}}>Incasso del giorno {props.day}</h1>
            {dailyList.length > 0 ?
                dailyList.map(movie =>
                    <Movie_boxoffice key={movie.movie} movie={movie}/>
                ) : <h2>Non ho trovato dati per oggi</h2>
            } 
        </>
    )
  }

  export default Dailyboxoffice