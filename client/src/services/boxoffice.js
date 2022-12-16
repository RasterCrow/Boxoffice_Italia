import axios from "axios";

const baseUrl = "https://boxofficeitalia-backend.vercel.app/boxoffice";

//const baseUrl = "https://afternoon-springs-92210.herokuapp.com/boxoffice";

// const baseUrl = "http://localhost:5000/boxoffice";

let movieList = {};
const dailyBoxOfficeList = new Map();
const weekendBoxOfficeList = new Map();
const yearlyBoxOfficeList = new Map();
const movieInfoBoxOfficeList = new Map();
const movieByTitleList = new Map();

const getMovieList = () => {
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

const getDailyBoxOfficeList = (day) => {
  return new Promise(function (resolve, reject) {
    console.log("has : ", dailyBoxOfficeList.has(day));
    if (!dailyBoxOfficeList.has(day)) {
      axios.get(`${baseUrl}/dailyboxoffice/${day}`).then((response) => {
        dailyBoxOfficeList.set(day, response.data);

        console.log("if: ", dailyBoxOfficeList);
        resolve(response.data);
      });
    } else {
      console.log("else: ", dailyBoxOfficeList);
      resolve(dailyBoxOfficeList.get(day));
    }
  });
};

const getWeekendBoxOfficeList = (weekend) => {
  return new Promise(function (resolve, reject) {
    if (!weekendBoxOfficeList.has(weekend)) {
      axios.get(`${baseUrl}/weekendboxoffice/${weekend}`).then((response) => {
        weekendBoxOfficeList.set(weekend, response.data);
        resolve(response.data);
      });
    } else {
      resolve(weekendBoxOfficeList.get(weekend));
    }
  });
};

const getYearlyBoxOfficeList = (year) => {
  return new Promise(function (resolve, reject) {
    if (!yearlyBoxOfficeList.has(year)) {
      axios.get(`${baseUrl}/yearlyBoxoffice/${year}`).then((response) => {
        yearlyBoxOfficeList.set(year, response.data);
        resolve(response.data);
      });
    } else {
      resolve(yearlyBoxOfficeList.get(year));
    }
  });
};

const getMovieInfo = (id) => {
  return new Promise(function (resolve, reject) {
    if (!movieInfoBoxOfficeList.has(id)) {
      axios.get(`${baseUrl}/movies/${id}`).then((response) => {
        movieInfoBoxOfficeList.set(id, response.data);
        resolve(response.data);
      });
    } else {
      resolve(movieInfoBoxOfficeList.get(id));
    }
  });
};

const getMovieInfoTMDB = (id) => {
  const request = axios.get(`${baseUrl}/movies/tmdb/${id}`);

  return request.then((response) => response.data);
};

const getAllTimeBoxOfficeList = () => {
  const request = axios.get(`${baseUrl}/alltime`);

  return request.then((response) => response.data);
};

const getMovieDailyBoxOfficeList = (id) => {
  const request = axios.get(`${baseUrl}/dailyboxofficeMovie/${id}`);

  return request.then((response) => response.data);
};

const getMovieWeekendBoxOfficeList = (id) => {
  const request = axios.get(`${baseUrl}/weekendboxofficeMovie/${id}`);

  return request.then((response) => response.data);
};

const getMovieByTitle = (title) => {
  return new Promise(function (resolve, reject) {
    if (!movieByTitleList.has(title)) {
      axios.get(`${baseUrl}/movies?title=${title}`).then((response) => {
        movieByTitleList.set(title, response.data);
        resolve(response.data);
      });
    } else {
      resolve(movieByTitleList.get(title));
    }
  });
};

//The ID is the one from TMDB, not from my local DB.
const getActorsByMovieID = (IdTMDB) => {
  const request = axios.get(`${baseUrl}/movies/tmdb_actors/${IdTMDB}`);
  return request.then((response) => response.data);
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
