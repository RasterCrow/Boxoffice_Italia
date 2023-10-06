import React, { useState, useEffect } from "react";
import BoxOfficeService from "../services/boxoffice.js";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import MovieCard from "./MovieCard";
import "./SearchPage.css";
import { useBoxOfficeContext } from "../services/BoxOfficeContext";

function SearchPage(props) {
  const movie = props.location.state.movie;
  const [similarMovieList, setSimilarMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [nPages, setNPages] = useState(1);
  const [fetchedDataComplete, setFetchedDataComplete] = useState(false);

  const { movieByTitleList, setMovieByTitleList } = useBoxOfficeContext();

  //hook effect, loads everytime there is a rebuild

  const hook = () => {
    setFetchedDataComplete(false);
    BoxOfficeService.getMovieByTitle(
      movie,
      movieByTitleList,
      setMovieByTitleList
    ).then((list) => {
      setSimilarMovieList(list);
      setFetchedDataComplete(true);
    });
  };
  useEffect(hook, [movie]);

  useEffect(() => {
    let items = [];
    let pages = similarMovieList.length / 10;

    if (pages < 1) {
      items.push(
        <Pagination.Item
          onClick={() => handleOnClickPage(1)}
          key={1}
          active={1 === currentPage + 1}
        >
          1
        </Pagination.Item>
      );
    } else {
      let eliAdded = false;
      for (let number = 1; number <= pages; number++) {
        if (number > 6 && number < pages - 3) {
          if (!eliAdded) {
            items.push(<Pagination.Ellipsis key={pages.length} />);
            eliAdded = true;
          }
        } else {
          items.push(
            <Pagination.Item
              onClick={() => handleOnClickPage(number)}
              key={number}
              active={number === currentPage + 1}
            >
              {number}
            </Pagination.Item>
          );
        }
      }
    }

    setNPages(items);
  }, [similarMovieList, currentPage]);

  const handleOnClickPage = (number) => {
    if (number - 1 < 0 || number - 1 > nPages.length) {
      //console.log("sbagliato");
    } else {
      setCurrentPage(number - 1);
    }
  };

  return (
    <>
      {fetchedDataComplete ? (
        <>
          <h1 id="titoloList">Film cercato : {movie}</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination>
              <Pagination.Prev onClick={() => handleOnClickPage(currentPage)} />
              {nPages}
              <Pagination.Next
                onClick={() => handleOnClickPage(currentPage + 2)}
              />
            </Pagination>
            <ListGroup>
              {similarMovieList.length < (currentPage + 1) * 10
                ? similarMovieList.map((movieFound) => (
                    <MovieCard
                      key={movieFound.movieId}
                      movieProps={movieFound}
                    />
                  ))
                : similarMovieList
                    .slice(currentPage * 10, (currentPage + 1) * 10)
                    .map((movieFound) => (
                      <MovieCard
                        key={movieFound.movieId}
                        movieProps={movieFound}
                      />
                    ))}
            </ListGroup>
          </div>
        </>
      ) : (
        <Image
          src="/assets/loading_icon.svg"
          style={{ display: "flex", margin: "auto" }}
        />
      )}
    </>
  );
}

export default SearchPage;
