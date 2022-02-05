const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=0328b8cc3b4fa4dc7ea4397fa8dba27e&query=${latitude},${longitude}`;

  request({ url: forecastUrl, json: true }, (error, response, data) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (data.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, 'It is currently ' + data.current.temperature + ' degress out. There is a ' + data.current.precip + '% chance of rain.')
    }
  })
}

module.exports = forecast
