// Filename: routes.js

'use strict';

// Initialize express router
var router = require('express').Router();

// Import city controller
var city_controller = require('../controllers/cities_controller');

// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to RESTful API weather server...',
       version: '1.0.0'
    });
});

router.route('/city')
    .get(city_controller.city_get_all)
    .post(city_controller.add_city);

router.route('/city/:name')
    .get(city_controller.city_get_one)
    .put(city_controller.update_city)
    .delete(city_controller.delete_city);

router.route('/city/country/:country_name')
    .get(city_controller.get_cities_for_country);

// Export API routes
module.exports = router;