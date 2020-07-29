import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './MovieInfo.css';

import BoxOfficeService from "../services/boxoffice.js";

function MovieInfo(props) {
  let movieID = props.match.params.id

  const [movieData, setMovieData] = useState(null)
  //when it loads, it should retrieve data of the movie from the db, like title and such

  const hook = () => {
    BoxOfficeService.getMovieInfoTMDB(movieID).then((movie) => {
      setMovieData(movie);
      console.log(movie)
    });
  };
  useEffect(hook, []);

  return (
    <>
      {movieData !== null ? (
        <Row>
          <Col lg={4}>
            <Image src={"https://image.tmdb.org/t/p/w300" + movieData.poster_path}></Image>
          </Col>
          <Col lg={8}>
            <Row lg={4}>
              {movieData.title}
            </Row>
            <Row lg={2}>

              {movieData.vote_average}
              {movieData.original_language}
              {movieData.release_Date}
            </Row>
            <Row lg={6}>
              {movieData.overview}
            </Row>
          </Col>
        </Row>


      ) : (
          <p>Carico il film ...</p>
        )
      }
    </>

  );
}

export default MovieInfo;




