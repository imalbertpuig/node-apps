const request = require('postman-request');

const forecast = (location, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=0328b8cc3b4fa4dc7ea4397fa8dba27e&query=${location}`;

  request({ url: forecastUrl, json: true }, (error, response, data) => {
    if (error) {
      console.log('Unable to connect to weather service!');
    } else if (response.body.error) {
      console.log(response.body.error.info);
    } else {
      callback(data.current);
    }
  });
}

module.exports = forecast;
