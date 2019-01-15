const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');

var app = express();

app.use(cors())

// Log:
const log4js = require('log4js');
log4js.configure('./config/log4js.json');
const logger = log4js.getLogger('weather-api');
app.use(log4js.connectLogger(logger, { level: log4js.levels.DEBUG }));

// Import routes:
let apiRoutes = require("./api_v1/routes/routes");
app.use('/', apiRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;