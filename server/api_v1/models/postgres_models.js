// Filename: postgres_models.js
'use strict';

var pg = require("pg");

const log = require('log4js').getLogger("weather-api");

var connectionString = "pg://postgres:123456@localhost:5432/MyProject";

const client = new pg.Client(connectionString);
client.connect();

// Create table of database
const query = client.query(
  'CREATE TABLE IF NOT EXISTS cities(id SERIAL PRIMARY KEY, name VARCHAR(50) not null unique, country VARCHAR(50) not null)');
query.on('end', () => {
    client.end(); 
});

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MyProject',
  password: '123456',
  port: 5432
});


/**
 * Get all cities.
 */
exports.getAllCities = function(callback) {

    try {
        pool.query('SELECT * FROM cities ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            log.debug('Cities:');
            log.debug(JSON.stringify(results.rows));
    
            if (callback) callback(error, results.rows);
        });
    }
    catch (e) {
        log.error("getAllCities: " + e);
        if (callback) callback(error, '{}');
    }
}

/**
 * Get one city.
 */
exports.getOneCity = function(city_name, callback) {
    const query = {
        text: 'SELECT * FROM cities WHERE name = $1',
        values: [city_name]
    }

    try {
        pool.query(query, (error, results) => {
            if (error) {
                throw error
            }
            else
            {
                log.debug('City:');
                log.debug(JSON.stringify(results.rows));

                if (callback) callback(error, results.rows);
            }
        });
    }
    catch (e) {
        log.error("getOneCity: " + e);
        if (callback) callback(error, '{}');
    }
}

/**
 * Get cities for country.
 */
exports.getCityByCountry = function(city_country, callback) {
    
    const query = {
        text: 'SELECT * FROM cities WHERE country = $1',
        values: [city_country]
    }

    try {
        pool.query(query, (error, results) => {
            if (error) {
                throw error
            }
            log.debug("City for country: " + city_country);
            log.debug(JSON.stringify(results.rows));
            
            if (callback) callback(error, results.rows);
        });
    }
    catch (e) {
        log.error("getCityByCountry: " + e);
        if (callback) callback(error, '{}');
    }
}

/**
 * Add new city.
 */
exports.addCity = function(city_name, city_country, callback) {
    
    const query = {
        text: 'INSERT INTO cities (name, country) VALUES ($1, $2) RETURNING *',
        values: [city_name, city_country]
    }
    
    try {
        pool.query(query, (error, results) => {
            if (error) {
                callback(error, '{}');
            }
            else
            {
                let message = "City added with ID: " + results.rows[0].id;
                log.debug(message);
                
                if (callback) callback(error, message);
            }
        })
    }
    catch (e) {
        log.error("addCity: " + e);
        if (callback) callback(error, '{}');
    }
};