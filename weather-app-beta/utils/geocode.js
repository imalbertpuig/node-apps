const request = require('postman-request');

const geocode = (location, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYXB1aWciLCJhIjoiY2t6OWM1cG95MTQ1eTJ2bjkyOW83c2t1NiJ9.BuJFaZPKVjSwsLGE731RTA`;

  request({ url: geocodeUrl, json: true }, (error, response, data) => {
    if (error) {
      console.log('Unable to connect to geocoding service!');
    } else {
      try {
        const feature = data.features[0];

        callback({
          placeName: feature.place_name,
          latitude: feature.center[0],
          longitude: feature.center[1],
        });
      } catch (e) {
        console.log('No coordinates found for this location!');
      }
    }
  });
}

module.exports = geocode;
