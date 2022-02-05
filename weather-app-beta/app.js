const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

forecast('barcelona', ({ temperature, precip }) => {
  console.log(`It is currently ${temperature} degrees out. There is a ${precip}% chance of rain.`);
});

geocode('barcelona', ({ placeName, latitude, longitude }) => {
  console.log(placeName, latitude, longitude);
});
