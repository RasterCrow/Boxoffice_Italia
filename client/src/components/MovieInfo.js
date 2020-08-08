import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DailyMovieInfo from "./DailyMovieInfo";
import WeekendMovieInfo from "./WeekendMovieInfo";
import './MovieInfo.css';

import BoxOfficeService from "../services/boxoffice.js";

function MovieInfo(props) {
  let movieID = props.match.params.id
  console.log(movieID)
  const [movieDataTMDB, setMovieDataTMDB] = useState(null)

  const [movieDataMongo, setMovieDataMongo] = useState(null)
  //when it loads, it should retrieve data of the movie from the db, like title and such

  const hook = () => {
    //Testing senza usare le API
    if (movieID === "5f1c12c36e1da74428c04315") {

      let movieInfo = {
        "popularity": 38.099,
        "id": 515001,
        "video": false,
        "vote_count": 4360,
        "vote_average": 8.1,
        "title": "Jojo Rabbit",
        "release_date": "2019-10-18",
        "original_language": "en",
        "original_title": "Jojo Rabbit",
        "genre_ids": [
          35,
          10752,
          18
        ],
        "backdrop_path": "/agoBZfL1q5G79SD0npArSlJn8BH.jpg",
        "adult": false,
        "overview": "Jojo, un bambino cresciuto dalla sola madre, ha come unico alleato il suo amico immaginario Adolf Hitler. Il suo ingenuo patriottismo viene però messo alla prova quando incontra una ragazzina che stravolge le sue convinzioni sul mondo, costringendolo ad affrontare le sue paure più grandi.",
        "poster_path": "/nYLhpz6iASM06q1i4C1QoUNGDk8.jpg"
      }
      setMovieDataTMDB(movieInfo);
      //after getting data from TMDB get box office data from my db
      BoxOfficeService.getMovieInfo(movieID).then((movie) => {
        setMovieDataMongo(movie);
      });
    } else {
      //Codice che dovrebbe girare normalmente
      BoxOfficeService.getMovieInfoTMDB(movieID).then((movie) => {
        setMovieDataTMDB(movie);
        console.log(movie)
      });


      //after getting data from TMDB get box office data from my db
      BoxOfficeService.getMovieInfo(movieID).then((movie) => {
        setMovieDataMongo(movie);
      });

    }
  };
  useEffect(hook, []);

  return (
    <>
      {movieDataTMDB !== null && movieDataMongo !== null ? (
        <div>
          <Row >
            <Col lg={5} id="ImagePoster" >
              <div className="sticky">
                <Image src={"https://image.tmdb.org/t/p/w300" + movieDataTMDB.poster_path}></Image>
              </div>
            </Col>
            <Col lg={7} id="MovieInfo">
              <div className="sticky" id="MovieInfoSticky">
                <Row >
                  <div id="MovieTitle">
                    {movieDataTMDB.title}
                  </div>
                </Row>

                <Row >
                  <div id="MovieRandomInfo">
                    <Image src={"/assets/tomato.svg"}></Image>
                    {movieDataTMDB.vote_average}
                    <Image src={"/assets/language.svg"}></Image>
                    {(movieDataTMDB.original_language).toUpperCase()}
                    <Image src={"/assets/calendar_icon.svg"}></Image>
                    {movieDataTMDB.release_date}
                    <Image src={"/assets/incasso_icon.svg"}></Image>

                    {parseInt(movieDataMongo.incasso).toLocaleString(
                      undefined, // leave undefined to use the browser's locale,
                      // or use a string like 'en-US' to override it.
                      { minimumFractionDigits: 0 }
                    )}
                    <Image src={"/assets/tickets_icon.svg"}></Image>

                    {parseInt(movieDataMongo.presenze).toLocaleString(
                      undefined, // leave undefined to use the browser's locale,
                      // or use a string like 'en-US' to override it.
                      { minimumFractionDigits: 0 }
                    )}

                  </div>
                </Row>
              </div>
              <Row >
                <div id="MovieDescription">
                  {movieDataTMDB.overview}
                </div>
              </Row>

              <Row >
                <DailyMovieInfo movieID={movieID} />
                <WeekendMovieInfo movieID={movieID} />
              </Row>
            </Col>
          </Row>

        </div>
        //Aggiungere tabella per daily boxoffice e weekend box office
      ) : (
          <p>Carico il film ...</p>
        )
      }
    </>

  );
}

export default MovieInfo;




