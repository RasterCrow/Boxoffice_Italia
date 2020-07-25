//this script should only retrieve data from the db to access it in the react fron-end
//it should also interact with tmdb api so I can also retrieve movie info.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')
const { json } = require('express')

const app = express()

// Read the host address and the port from the environment
const PORT = process.env.PORT || 3001;
const TMDB_API_KEY = process.env.TMDB_API_KEY

//mongodb info

const mongodb_uri = process.env.MONGODB_URI

console.log("connecting to db...")
mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//schemas for mongoose
const movieSchema = new mongoose.Schema({
  movieId: String,
  titolo: String,
  dataUscita: String,
  paese: String,
  distribuzione: String,
  incasso: String,
  presenze: String,
})

movieSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const weekendboxofficeSchema = new mongoose.Schema({
  movie: String,
  inizioWeekend: String,
  fineWeekend: String,
  weekendNumero: String,
  posizioneClassificaWeekend: String,
  presenzeWeekend: String,
  incassoWeekend: String,
},{collection: 'weekendboxoffice' })

weekendboxofficeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const dailyboxofficeSchema = new mongoose.Schema({
  giorno: String,
  movie: String,
  posizioneClassifica: String,
  presenze: String,
  incasso: String,
  incassoTotaleAlGiorno: String,
},{collection: 'dailyboxoffice' })

dailyboxofficeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  //module.exports  mongoose.model('Note', noteSchema)

const Movie_db = mongoose.model('Movie', movieSchema)
const Dailyboxoffice_db = mongoose.model('dailyboxoffice', dailyboxofficeSchema)
const Weekendboxoffice_db = mongoose.model('weekendboxoffice', weekendboxofficeSchema)


app.use(cors())

app.get('/', (req,res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/boxoffice', (req,res) => {
    res.send('<h1>Hello BoxOffice!</h1>')
})

app.get('/boxoffice/movies', (req,res) => {
    Movie_db.find({})
      .then(movies_list => {
        if(movies_list){
          res.json(movies_list)
        } else {
          res.status(404).end()
        }
        
      })
      .catch(error => {
        console.log(error)
        res.status(500).end()
      })
})

app.get('/boxoffice/movies/:id', (req,res) => {
    let id = req.params.id
    console.log(id)
    Movie_db.findById(id.toString())
      .then(async movie => {
        console.log(movie)
        if(movie){
          let json_array=[]
          let movie_found=true
          //retrieve movie data and also movie info from tmdb
          //make axios call to tmdb
          await axios.get(`https://api.themoviedb.org/3/search/movie?`, {
            params: {
              api_key: TMDB_API_KEY,
              language: 'it-IT',
              query: movie.titolo,
              //year:movie.
            }
          })
          .then(axios_res =>{
            //I'll need to check that only one movie gets returned, maybe
            movie_found=true
            json_array.push(axios_res.data.results[0])
          })
          .catch(error => {
            movie_found=false
            console.log(error)
          })
          //join both jsons in array and return that.
          if(movie_found){
            //console.log("movie found")
            json_array.push(movie)
            res.send(json_array)
          }else{
            res.json(movie)
          }
        } else {
          res.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).end()
      })
    
})

app.get('/boxoffice/dailyboxoffice', (req,res) => {
    Dailyboxoffice_db.find({})
      .then(daily_list => {
        if(daily_list){
          res.json(daily_list)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).end()
      })
})

app.get('/boxoffice/dailyboxoffice/:id', (req,res) => {

    Dailyboxoffice_db.find({'movie' : req.params.id})
      .then(daily_list => {
        if(daily_list){
          res.json(daily_list)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).end()
      })
})

app.get('/boxoffice/weekendboxoffice', (req,res) => {
    Weekendboxoffice_db.find({})
      .then(weekend_list => {
        if(weekend_list){
          res.json(weekend_list)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).end()
      })
})

app.get('/boxoffice/weekendboxoffice/:id', (req,res) => {

    Weekendboxoffice_db.find({'movie' : req.params.titolo})
      .then(weekend_list => {
        if(weekend_list){
          res.json(weekend_list)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).end()
      })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })