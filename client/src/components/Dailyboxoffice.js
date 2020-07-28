import React, { useState, useEffect } from 'react'
import BoxOfficeService from '../services/boxoffice.js'
import Table from 'react-bootstrap/Table'
import MovieTableTr from './MovieTableTr'
import './BoxofficeList.css'
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
            <h1 id='titolo_list'>Incasso del giorno {props.day}</h1>
            
              {dailyList.length > 0 ? (
                <Table id ='tabellaDaily' striped bordered hover responsive="md" variant="dark">
                  <thead>
                    <tr>
                      <th>Posizione</th>
                      <th>Titolo</th>
                      <th>Incasso</th>
                      <th>Presenze</th>
                      <th>Incasso ad oggi</th>
                    </tr>
                  </thead>
                  <tbody>
                  {dailyList.map(movie =>
                      <MovieTableTr key={movie.movie} movie={movie}/>
                  )}
                  </tbody>
                </Table>  
                  ): <h2>Non ho trovato dati per questo weekend</h2>
              }
              
        </>
    )
  }

  export default Dailyboxoffice