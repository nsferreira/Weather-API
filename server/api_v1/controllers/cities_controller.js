// Filename: cities_controller.js

'use strict';

const request = require('request');
const qs = require('querystring');

// Import city controller
var postgres = require('../models/postgres_models');
var getTempInfo = require('../utils/openweathermap');

// CODES HTML:
// res.status(200).send('OK')
// res.status(403).send('Forbidden')
// res.status(404).send('Not Found')
// res.status(500).send('Internal Server Error')

var log = require('log4js').getLogger("weather-api");

/**
 * Get all cities.
 */
exports.city_get_all = function(req, res, next) {
    log.debug("Request all cities.");

    // Postgres:
    postgres.getAllCities(function(err, response) {
        if (err)
        {
          log.error("Error in getAllCities: " + err);
          res.status(500).send(err);
        }
        else
        {
            res.status(200).send(response);
        }
    });
};

/**
 * Get all cities for country.
 */
exports.get_cities_for_country = function(req, res, next) {
  var country_name = req.params.country_name;

    // Postgres:
    postgres.getCityByCountry(country_name, function(err, response) {
        if (err)
        {
            log.error("Error in getCityByCountry: " + err);
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(response);
        }
    });
};

/**
 * Get one city.
 */
exports.city_get_one = function(req, res, next) {
    var name = req.params.name;
    
    // Postgres:
    postgres.getOneCity(name, function(err, response) {
        if (err)
        {
            log.error("Error in getOneCity: " + err);
            res.status(500).send(err);
        }
        else
        {
            if (response.length == 0)
                res.status(200).send({'message': 'city not exist'});
            else
            {
                getTempInfo({name: response[0].name, country: response[0].country}, function(info, error) {
                    log.debug(info, error)
                    if (error)
                    {
                        res.status(500).send(error);
                    } else {
                        res.status(200).send(info);
                    }
                
                })
            }
        }
    });
};

/**
 * Add new city.
 */
exports.add_city = function(req, res, next) {

    if (req.method == 'POST') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk.toString();
        })

        req.on('end', () => {
            let city = JSON.parse(data);
            
            // Postgres:
            postgres.addCity(city.name, city.country, function(err, response) {
                if (err)
                {
                    log.error("Error in addCity: " + err);
                    res.status(500).send(err);
                }
                else
                {
                    log.debug(response);
                    res.status(201).send(response);
                }
            });
        })
    }
};

/**
 * 
 */
exports.update_city = function(req, res, next) {
    let name = req.params.id;

    res.status(501).send("update_city - not implemented ... ");
};

/**
 * 
 */
exports.delete_city = function(req, res, next) {
    let name = req.params.id;

    res.status(501).send("delete_city - not implemented ... ");
};