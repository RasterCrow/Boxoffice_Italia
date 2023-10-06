// MovieContext.js
import React, { createContext, useState, useContext } from "react";

const BoxOfficeContext = createContext();

export const BoxOfficeProvider = ({ children }) => {
  const [movieList, setMovieList] = useState({});
  const [dailyBoxOfficeList, setDailyBoxOfficeList] = useState(new Map());
  const [weekendBoxOfficeList, setWeekendBoxOfficeList] = useState(new Map());
  const [yearlyBoxOfficeList, setYearlyBoxOfficeList] = useState(new Map());
  const [movieInfoBoxOfficeList, setMovieInfoBoxOfficeList] = useState(
    new Map()
  );
  const [movieByTitleList, setMovieByTitleList] = useState(new Map());
  const [dailyBoxOfficeMovieList, setDailyBoxOfficeMovieList] = useState(
    new Map()
  );
  const [weekendBoxOfficeMovieList, setWeekendBoxOfficeMovieList] = useState(
    new Map()
  );
  const [tmdbDataList, setTmdbDataList] = useState(new Map());
  const [tmdbActorsList, setTmdbActorsList] = useState(new Map());

  return (
    <BoxOfficeContext.Provider
      value={{
        movieList,
        setMovieList,
        dailyBoxOfficeList,
        setDailyBoxOfficeList,
        weekendBoxOfficeList,
        setWeekendBoxOfficeList,
        yearlyBoxOfficeList,
        setYearlyBoxOfficeList,
        movieInfoBoxOfficeList,
        setMovieInfoBoxOfficeList,
        movieByTitleList,
        setMovieByTitleList,
        dailyBoxOfficeMovieList,
        setDailyBoxOfficeMovieList,
        weekendBoxOfficeMovieList,
        setWeekendBoxOfficeMovieList,
        tmdbDataList,
        setTmdbDataList,
        tmdbActorsList,
        setTmdbActorsList,
      }}
    >
      {children}
    </BoxOfficeContext.Provider>
  );
};

export const useBoxOfficeContext = () => {
  const context = useContext(BoxOfficeContext);
  if (!context) {
    throw new Error(
      "useBoxOfficeContext must be used within a BoxOfficeProvider"
    );
  }
  return context;
};
