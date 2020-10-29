const request = require('request');
 
const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aa8f2b4422dbcb14624a5117f7b31d70&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '&units=m';

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please insert another coordinates!', undefined)
        } else {
            callback(undefined, {
                timeDescription: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
            })
        }
    });
}

module.exports = forecast;