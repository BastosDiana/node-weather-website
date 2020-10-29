const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGlhbmFyb3NhYmFzdG9zIiwiYSI6ImNrZzFja2JmMTEwaXUydW9iczh2MTA4emoifQ.UvHuSzCQUJhDoqHwh0IChw&limit=1'

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect geolocation service!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;