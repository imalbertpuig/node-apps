const request = require('postman-request')

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXB1aWciLCJhIjoiY2t6OWM1cG95MTQ1eTJ2bjkyOW83c2t1NiJ9.BuJFaZPKVjSwsLGE731RTA&limit=1`;

  request({ url: geocodeUrl, json: true }, (error, response, data) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (data.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name
      })
    }
  })
}

module.exports = geocode
