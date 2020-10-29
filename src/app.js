const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryFile = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryFile));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Diana Bastos'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Diana Bastos'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Diana Bastos'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Enable to find location. Try another address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error){
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            };
    
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });

});

//Costumizing the error inside Page, when the page called doesn't exist
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Diana Bastos',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Diana Bastos',
        message: 'Page not found'
    });
});


app.listen(4000, () => {
    console.log('Server is up on port 4000.');
});