# BoxOffice Italia WebApp
<p align="center">
  <img height="400" src="https://i.imgur.com/V4BOjFa.jpg" />
</p>

Source code of BoxOffice Italia, WebApp that I developed to make make it eassier to checek the box office earnings of movies coming out in Italian cinemas.

The Webapp was made for private use only, but i'm working on a demo version.

The Webapp was made for private use only, but there is a public demo available [here](https://boxoffice-demo-37179.web.app/).

UPDATE 2023 : This app was one of my first big projects. Trying to change something now, after years, I realize how much spaghetti code and bad practices I used. You've been warned! 
# Structure
The client side of BoxOffice Italia has been developed in React Framework, hosted on Firebase Hosting.

On the server side BoxOffice Italia was developed with Express, hosted on Heroku.

BoxOffice data is saved with MongoDB, hosted on MongoDB Atlas.

Data retrieval is handled through a script hosted on AWS Lambda, scheduled with AWS Event Bridge to run daily.

Furthermore, BoxOffice Italia makes use of the APIs offered by TMDB to retrieve extra information on the films such as actors, cover, description, etc ...

# Functionality
<p align = "center">
  <img height = "400" src = "https://i.imgur.com/DEnJkwK.jpg" />
</p>

BoxOffice Italia allows users to quickly and accurately view the revenues of movies coming out in cinemas in Italy, similar to BoxOffice Mojo or The Numbers.

This data can be viewed by day, weekend and year or even by specific film.

There are also more advanced information like the difference in percentage of earnings day by day and alerts for newly released films.

Not all the revenues are available, as I only started taking these into account at the end of 2019; However, there is a section with the highest revenues ever.

# Reasons about creation
I like to speculate and follow this type of data and since there are several sites available abroad to do so, I thought about making something similar for data in Italy.

Most sites in Italy only take into account the last two weeks, so I created BoxOffice Italy to take into account the entire cinema run.

I originally had a more basic version developed in PHP and hosted with Apache on my Raspberry. But I wanted to improve my skills as a web dev and I decided to create a more up to date and modern version.

For the moment it is only available for my private use.

However, a demo version will be available soon.

# Privacy
The WebApp does not store any user data.

The WebApp does not use cookies or session data.
