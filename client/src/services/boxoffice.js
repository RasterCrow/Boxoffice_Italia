import axios from 'axios'
const baseUrl = 'http://localhost:3001/boxoffice'



//get list of all movies available
const getMovieList = () => {
    const request = axios.get(`${baseUrl}/movies`)

    return request.then(response => response.data)
}

const getDailyBoxOfficeList = (day) => {
    const request = axios.get(`${baseUrl}/dailyboxoffice/${day}`)

    return request.then(response => response.data)
}

const getWeekendBoxOfficeList = (weekend) => {
    const request = axios.get(`${baseUrl}/weekendboxoffice/${weekend}`)
    return request.then(response => response.data)
}

const getYearlyBoxOfficeList = (year) => {
    const request = axios.get(`${baseUrl}/yearlyBoxoffice/${year}`)

    return request.then(response => response.data)
}

const getMovieInfo = (id) => {
    const request = axios.get(`${baseUrl}/movies/${id}`)

    return request.then(response => response.data)
}
const getMovieInfoTMDB = (id) => {
    const request = axios.get(`${baseUrl}/movies/tmdb/${id}`)

    return request.then(response => response.data)
}


const getAllTimeBoxOfficeList = () => {
    const request = axios.get(`${baseUrl}/alltime`)

    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
    //return request.then(response => response.data)
}

const updatePersonNumber = (id, personWithNewPhone) => {
    const request = axios.put(`${baseUrl}/${id}`, personWithNewPhone)
    return request.then(response => response.data)
    //return request.then(response => response.data)
}

export default {
    getMovieList,
    getDailyBoxOfficeList,
    getWeekendBoxOfficeList,
    getMovieInfo,
    getYearlyBoxOfficeList,
    getAllTimeBoxOfficeList,
    getMovieInfoTMDB
}