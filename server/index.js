//this script should only retrieve data from the db to access it in the react fron-end
//it should also interact with tmdb api so I can also retrieve movie info.
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const { json } = require("express");

const app = express();

// Read the host address and the port from the environment
const PORT = process.env.PORT || 3001;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

//mongodb info

const mongodb_uri = process.env.MONGODB_URI;

console.log("connecting to db...");
mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

//schemas for mongoose
const movieSchema = new mongoose.Schema({
  movieId: String,
  titolo: String,
  dataUscita: Date,
  paese: String,
  distribuzione: String,
  incasso: Number,
  presenze: Number,
});

movieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const weekendboxofficeSchema = new mongoose.Schema(
  {
    movie: String,
    inizioWeekend: Date,
    fineWeekend: Date,
    weekendNumero: Number,
    posizioneClassificaWeekend: Number,
    presenzeWeekend: Number,
    incassoWeekend: Number,
  },
  { collection: "weekendboxoffice" }
);

weekendboxofficeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const dailyboxofficeSchema = new mongoose.Schema(
  {
    giorno: Date,
    movie: String,
    posizioneClassifica: Number,
    presenze: Number,
    incasso: Number,
    incassoTotaleAlGiorno: Number,
  },
  { collection: "dailyboxoffice" }
);

dailyboxofficeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//module.exports  mongoose.model('Note', noteSchema)

const Movie_db = mongoose.model("Movie", movieSchema);
const Dailyboxoffice_db = mongoose.model(
  "dailyboxoffice",
  dailyboxofficeSchema
);
const Weekendboxoffice_db = mongoose.model(
  "weekendboxoffice",
  weekendboxofficeSchema
);


app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/boxoffice", (req, res) => {
  res.send("<h1>Hello BoxOffice!</h1>");
});

//retrieves all movie documents
app.get("/boxoffice/movies", (req, res) => {
  Movie_db.find({})
    .then((movies_list) => {
      if (movies_list) {
        res.json(movies_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

//retrieves movie by id
app.get("/boxoffice/movies/:id", (req, res) => {
  let id = req.params.id;
  //console.log(id)
  Movie_db.findById(id)
    .then(async (movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

//retrieves data from tmdb. it has movie id, but it actually searches by name of that movie id
app.get("/boxoffice/movies/tmdb/:id", (req, res) => {
  let id = req.params.id;
  //console.log(id)
  Movie_db.findById(id.toString())
    .then(async (movie) => {
      if (movie) {
        let movie_found = true;
        let titolo = movie.titolo.replace(/ *\([^)]*\) */g, "");
        //retrieve movie data and also movie info from tmdb
        //make axios call to tmdb
        await axios
          .get(`https://api.themoviedb.org/3/search/movie?`, {
            params: {
              api_key: TMDB_API_KEY,
              language: "it-IT",
              query: titolo,
              //year:movie.
            },
          })
          .then((axios_res) => {
            //I'll need to check that only one movie gets returned, maybe
            res.json(axios_res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

//retrieves all daily documents
app.get("/boxoffice/dailyboxoffice", (req, res) => {
  console.log("chiamata a dailyBoxoffice/");
  Dailyboxoffice_db.find({})
    .then((daily_list) => {
      if (daily_list) {
        res.json(daily_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

//retrieves by day
app.get("/boxoffice/dailyboxoffice/:day", (req, res) => {
  //console.log("chiamata a dailyBoxoffice/:day");

  Dailyboxoffice_db.find({ giorno: req.params.day })
    .then((daily_list) => {
      if (daily_list) {
        res.json(daily_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});


//retrieves by movie id
app.get("/boxoffice/dailyboxoffice/:id", (req, res) => {
  Dailyboxoffice_db.find({ movie: req.params.id })
    .then((daily_list) => {
      if (daily_list) {
        res.json(daily_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

//retrieves all wekeend documents
app.get("/boxoffice/weekendboxoffice", (req, res) => {
  Weekendboxoffice_db.find({})
    .then((weekend_list) => {
      if (weekend_list) {
        res.json(weekend_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});


//retrieves all wekeend by weekend date
app.get("/boxoffice/weekendboxoffice/:weekend", (req, res) => {
  //console.log("chiamata a /boxoffice/weekendboxoffice/:weekend")
  Weekendboxoffice_db.find({ inizioWeekend: req.params.weekend })
    .then((weekend_list) => {
      if (weekend_list) {
        res.json(weekend_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

//retrieves weekend box office by id of movie
app.get("/boxoffice/weekendboxoffice/:id", (req, res) => {
  Weekendboxoffice_db.find({ movie: req.params.id })
    .then((weekend_list) => {
      if (weekend_list) {
        res.json(weekend_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});


//retrieves yearly box office by year
app.get("/boxoffice/yearlyboxoffice/:year", (req, res) => {
  console.log("chiamata a /boxoffice/yearlyboxoffice/:year")
  start_date = req.params.year + "-01-01"
  end_date = req.params.year + "-12-31"
  Movie_db.find({ dataUscita: { $gte: start_date, $lte: end_date } }).sort({ incasso: -1 }).limit(10)
    .then((yearly_list) => {

      if (yearly_list) {
        res.json(yearly_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});


//retrieves all time box office
app.get("/boxoffice/alltime", (req, res) => {
  console.log("chiamata a /boxoffice/alltime")

  Movie_db.find().sort({ incasso: -1 }).limit(10)
    .then((all_time_list) => {
      if (all_time_list) {
        res.json(all_time_list);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

