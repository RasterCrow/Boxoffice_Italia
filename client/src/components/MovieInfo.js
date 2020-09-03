import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import DailyMovieInfo from "./DailyMovieInfo";
import WeekendMovieInfo from "./WeekendMovieInfo";
import './MovieInfo.css';

import BoxOfficeService from "../services/boxoffice.js";


function CastCard({ person }) {
  return (
    <>
      <Card className="CastCard" style={{ width: '5rem' }}>
        {person.profile_path === null ? (
          <Card.Img className="CastCardImage" variant="top" src={"/assets/default_avatar.svg"} style={{ height: "135px", width: "90px", backgroundColor: "rgb(192, 192, 192)" }} />
        ) : (
            <Card.Img className="CastCardImage" variant="top" src={"https://image.tmdb.org/t/p/original" + person.profile_path} />
          )
        }
        <Card.Body>
          <Card.Title>
            {person.name}
          </Card.Title>
          <Card.Text>
            {person.character}
          </Card.Text>
        </Card.Body>
      </Card>

    </>
  )
}


function CastList({ movieCast, movieId }) {
  return (
    <>
      {/* Lista degli attori */}

      {
        movieCast.slice(0, 8).map((castMember) => (
          <a target="_blank" rel="noopener noreferrer" title="Portami alla pagina dell'attore" href={`https://www.themoviedb.org/person/${castMember.id}`} key={castMember.cast_id}><CastCard person={castMember} type="cast" /></a>
        ))
      }
      <Card id="MoreCastCard">
        <a target="_blank" rel="noopener noreferrer" title="Portami alla pagina con tutto il cast" href={`https://www.themoviedb.org/movie/${movieId}/cast`}><Card.Body>View more...</Card.Body></a>
      </Card>
    </>
  )
}

function MovieInfo(props) {
  let movieID = props.match.params.id

  const [movieDataTMDB, setMovieDataTMDB] = useState({})
  const [movieCast, setMovieCast] = useState({})

  const [movieDataMongo, setMovieDataMongo] = useState({})
  //when it loads, it should retrieve data of the movie from the db, like title and such
  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

  const hook = () => {
    //Codice che dovrebbe girare normalmente
    BoxOfficeService.getMovieInfoTMDB(movieID).then((movie) => {
      setMovieDataTMDB(movie);
      return movie
    })
      .then((movie) => {
        if (movie.id !== undefined) {
          BoxOfficeService.getActorsByMovieID(movie.id).then((cast) => {

            setMovieCast(cast);
          })
            .then(() => {
              //after getting data from TMDB get box office data from my db
              BoxOfficeService.getMovieInfo(movieID).then((movie) => {
                setMovieDataMongo(movie);
                setFetchedDataComplete(true)
              });
            })
        } else {
          //even if I can't get data from tmdb I still get data from my mongo db
          BoxOfficeService.getMovieInfo(movieID).then((movie) => {
            setMovieDataMongo(movie);
            setFetchedDataComplete(true)
          });
        }
      })
  };
  useEffect(hook, [props.match.params.id]);


  return (
    <>
      {fetchedDataComplete ? (
        movieDataTMDB.length !== 0 && movieCast.length !== 0 ? (
          <>
            <Row id="RowMovieData">
              <Col lg={4} >

                <Row id="ImagePoster" className="sticky" >
                  <a id="ImgLinkFilm" target="_blank" rel="noopener noreferrer" title="Portami alla pagina del film" href={`https://www.themoviedb.org/movie/${movieDataTMDB.id}?language=it-IT`}>
                    <Image src={"https://image.tmdb.org/t/p/w300" + movieDataTMDB.poster_path}></Image>
                  </a>
                </Row>
                <h2 className="TitoloCentrato stickyCastTitolo"  >Cast:</h2>
                <Row id="MovieCastSticky" className="stickyCast" >
                  <CastList movieCast={movieCast.cast} movieId={movieDataTMDB.id} />
                </Row>
              </Col>
              <Col lg={8} id="MovieInfo" style={{ margin: "auto" }}>
                <div className="sticky" id="MovieInfoSticky">
                  <Row >
                    <div id="MovieTitle">
                      {movieDataTMDB.title}
                    </div>
                  </Row>

                  <Row>
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
                {/* Movie Description*/}
                <div id="MovieDescription">
                  {movieDataTMDB.overview}
                </div>
                {/* Table Data */}
                <h2 style={{ margin: "auto", textAlign: "center", marginTop: "30px" }}>Incassi giornalieri</h2>
                <DailyMovieInfo movieID={movieID} />
                <h2 style={{ margin: "auto", textAlign: "center", marginTop: "10px" }}>Incassi weekend</h2>
                <WeekendMovieInfo movieID={movieID} />
              </Col>
            </Row>

          </>
        ) :
          (
            <>
              <h2 style={{ color: "red", textAlign: "center", marginTop: "40px" }}>
                Non ho trovato dati extra per questo film
            </h2>
              <div>
                <Row >

                  <Col lg={7} id="MovieInfo" style={{ margin: "auto" }}>
                    <div className="sticky" id="MovieInfoSticky">
                      <Row >
                        <div id="MovieTitle">
                          {movieDataMongo.titolo}
                        </div>
                      </Row>
                    </div>

                    {/* Table Data */}
                    <h2 style={{ margin: "auto", textAlign: "center", marginTop: "30px" }}>Incassi giornalieri</h2>
                    <DailyMovieInfo movieID={movieID} />
                    <h2 style={{ margin: "auto", textAlign: "center", marginTop: "10px" }}>Incassi weekend</h2>
                    <WeekendMovieInfo movieID={movieID} />
                  </Col>
                </Row>

              </div>
            </>
          )

      ) : (
          <Image src="/assets/loading_icon.svg" style={{ display: "flex", margin: "auto" }} />
        )
      }
    </>

  );
}

export default MovieInfo;




