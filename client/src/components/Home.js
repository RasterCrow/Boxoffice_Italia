import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import "./Home.css";



function CarouselMovies() {
    const history = useHistory();
    return (
        <Carousel indicators={false} controls={false} touch={false}>
            <Carousel.Item>
                <img
                    onClick={(event) => history.push(`/movie/5f475a0ed5323f0008d2ae63`)}
                    className="carouselImage d-block "
                    src="https://image.tmdb.org/t/p/w500/w93KBwtAyLRHSwPApC9ojVbblz3.jpg"
                    alt="Tenet slide"
                    style={{ cursor: "pointer" }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    onClick={(event) => history.push(`/movie/5f1c12bf6e1da74428c042c1`)}
                    className="carouselImage d-block "
                    src="https://image.tmdb.org/t/p/w500/y1AthYH1r2j4N4cYn2HdrEGgrnJ.jpg"
                    alt="Joker slide"
                    style={{ cursor: "pointer" }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img

                    onClick={(event) => history.push(`/movie/5f1c12c36e1da74428c04315`)}
                    className="carouselImage d-block "
                    src="https://image.tmdb.org/t/p/w500/nYLhpz6iASM06q1i4C1QoUNGDk8.jpg"
                    alt="Jojo Rabbit slide"
                    style={{ cursor: "pointer" }}


                />

            </Carousel.Item>
        </Carousel>
    );
}


function Home() {

    return (
        <>
            <Row style={{ maxHeight: "100%", Height: "100%" }}>
                {/* Famous movies */}
                <Col lg={3} >
                    <CarouselMovies />
                </Col>
                {/*Header for the homepage */}
                <Col lg={9} style={{ padding: "50px" }}>
                    <h2 style={{ margin: "auto", marginTop: "20px" }}>Benvenuto su BoxOffice Italia</h2>
                    <br />
                    <p>
                        Su questo sito puoi seguire l'andamento al botteghino della maggior parte dei film usciti in Italia al cinema.
                        <br />
                            Se volete aiutarmi allo sviluppo potete trovare tutto il codice <a target='_blank' href="https://github.com/RasterCrow/Boxoffice_Italia">qui</a>.
                            <br />
                        Se invece avete bisogno di una mano, o per qualsiasi altro problema, potete contattarmi sui contatti disponibili sul mio <a target='_blank' href="https://rastercrow.me">sito</a>.
                    </p>
                </Col>


            </Row>
        </>
    )
}

export default Home;