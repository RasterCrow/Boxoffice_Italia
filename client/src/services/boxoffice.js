import axios from "axios";

const baseUrl = "https://boxofficeitalia-backend.vercel.app/boxoffice";

// const baseUrl = "http://localhost:5000/boxoffice";

const getMovieList = (movieList) => {
  return new Promise(function (resolve, reject) {
    if (!movieList) {
      axios.get(`${baseUrl}/movies`).then((response) => {
        movieList = response.data;
        resolve(response.data);
      });
    } else {
      resolve(movieList);
    }
  });
};

const getDailyBoxOfficeList = (
  day,
  dailyBoxOfficeList,
  setDailyBoxOfficeList
) => {
  return new Promise(function (resolve, reject) {
    if (!dailyBoxOfficeList.has(day)) {
      axios.get(`${baseUrl}/dailyboxoffice/${day}`).then((response) => {
        setDailyBoxOfficeList(dailyBoxOfficeList.set(day, response.data));
        resolve(response.data);
      });
    } else {
      resolve(dailyBoxOfficeList.get(day));
    }
  });
};
const getWeekendBoxOfficeList = (
  weekend,
  weekendBoxOfficeList,
  setWeekendBoxOfficeList
) => {
  return new Promise(function (resolve, reject) {
    if (!weekendBoxOfficeList.has(weekend)) {
      axios.get(`${baseUrl}/weekendboxoffice/${weekend}`).then((response) => {
        setWeekendBoxOfficeList(
          new Map(weekendBoxOfficeList.set(weekend, response.data))
        );
        resolve(response.data);
      });
    } else {
      resolve(weekendBoxOfficeList.get(weekend));
    }
  });
};

const getYearlyBoxOfficeList = (
  year,
  yearlyBoxOfficeList,
  setYearlyBoxOfficeList
) => {
  return new Promise(function (resolve, reject) {
    if (!yearlyBoxOfficeList.has(year)) {
      axios.get(`${baseUrl}/yearlyBoxoffice/${year}`).then((response) => {
        setYearlyBoxOfficeList(
          new Map(yearlyBoxOfficeList.set(year, response.data))
        );
        resolve(response.data);
      });
    } else {
      resolve(yearlyBoxOfficeList.get(year));
    }
  });
};
const getMovieInfo = (
  id,
  movieInfoBoxOfficeList,
  setMovieInfoBoxOfficeList
) => {
  return new Promise(function (resolve, reject) {
    if (!movieInfoBoxOfficeList.has(id)) {
      axios.get(`${baseUrl}/movies/${id}`).then((response) => {
        setMovieInfoBoxOfficeList(
          new Map(movieInfoBoxOfficeList.set(id, response.data))
        );
        resolve(response.data);
      });
    } else {
      resolve(movieInfoBoxOfficeList.get(id));
    }
  });
};

const getMovieInfoTMDB = (id, tmdbDataList, setTmdbDataList) => {
  return new Promise(function (resolve, reject) {
    if (!tmdbDataList.has(id)) {
      axios.get(`${baseUrl}/movies/tmdb/${id}`).then((response) => {
        setTmdbDataList(new Map(tmdbDataList.set(id, response.data)));
        resolve(response.data);
      });
    } else {
      resolve(tmdbDataList.get(id));
    }
  });
};

const getAllTimeBoxOfficeList = () => {
  const request = axios.get(`${baseUrl}/alltime`);

  return request.then((response) => response.data);
};

const getMovieDailyBoxOfficeList = (
  id,
  dailyBoxOfficeMovieList,
  setDailyBoxOfficeMovieList
) => {
  return new Promise(function (resolve, reject) {
    if (!dailyBoxOfficeMovieList.has(id)) {
      axios.get(`${baseUrl}/dailyboxofficeMovie/${id}`).then((response) => {
        setDailyBoxOfficeMovieList(
          new Map(dailyBoxOfficeMovieList.set(id, response.data))
        );
        resolve(response.data);
      });
    } else {
      resolve(dailyBoxOfficeMovieList.get(id));
    }
  });
};

const getMovieWeekendBoxOfficeList = (
  id,
  weekendBoxOfficeMovieList,
  setWeekendBoxOfficeMovieList
) => {
  return new Promise(function (resolve, reject) {
    if (!weekendBoxOfficeMovieList.has(id)) {
      axios.get(`${baseUrl}/weekendboxofficeMovie/${id}`).then((response) => {
        setWeekendBoxOfficeMovieList(
          new Map(weekendBoxOfficeMovieList.set(id, response.data))
        );
        resolve(response.data);
      });
    } else {
      resolve(weekendBoxOfficeMovieList.get(id));
    }
  });
};

const getMovieByTitle = (title, movieByTitleList, setMovieByTitleList) => {
  return new Promise(function (resolve, reject) {
    if (!movieByTitleList.has(title)) {
      axios.get(`${baseUrl}/movies?title=${title}`).then((response) => {
        setMovieByTitleList(
          new Map(movieByTitleList.set(title, response.data))
        );
        resolve(response.data);
      });
    } else {
      resolve(movieByTitleList.get(title));
    }
  });
};

//The ID is the one from TMDB, not from my local DB.
const getActorsByMovieID = (IdTMDB, tmdbActorsList, setTmdbActorsList) => {
  return new Promise(function (resolve, reject) {
    if (!tmdbActorsList.has(IdTMDB)) {
      axios.get(`${baseUrl}/movies/tmdb_actors/${IdTMDB}`).then((response) => {
        setTmdbActorsList(new Map(tmdbActorsList.set(IdTMDB, response.data)));
        resolve(response.data);
      });
    } else {
      resolve(tmdbActorsList.get(IdTMDB));
    }
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMovieList,
  getDailyBoxOfficeList,
  getWeekendBoxOfficeList,
  getMovieInfo,
  getYearlyBoxOfficeList,
  getAllTimeBoxOfficeList,
  getMovieInfoTMDB,
  getMovieDailyBoxOfficeList,
  getMovieWeekendBoxOfficeList,
  getMovieByTitle,
  getActorsByMovieID,
};
