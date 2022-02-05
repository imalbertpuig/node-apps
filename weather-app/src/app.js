const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public'); // all the public assets
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebears engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Albert Puig',
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Albert Puig',
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is some helpful text.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address term!'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error404', {
    title: 'Error 404',
    message: 'Help article not found',
  });
});

// it needs to come last because it listens for all routes
app.get('*', (req, res) => {
  res.render('error404', {
    title: 'Error 404',
    message: 'Page not found',
  });
});

app.listen(3001, () => {
  console.log('Server is up on port 3001.');
});
