const request = require('request');
const apiKey = '939ced293cff1f5a887d191f42a3e7f6';

const log = require('log4js').getLogger("weather-api");

getTempInfo = function(city, callback)
{
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}`
    
    request(url, function (err, response, body) {
        let error = null
        let info = null

        if (err) {
            log.error("Something went wrong:", err);
            error = err;
        } else {
            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                log.error({weather: null, error: 'City does not exist'});
                error = {weather: null, error: 'City does not exist'};
            } else {
                let temperature = (weather.main.temp - 273.15);
                let sunrise = weather.sys.sunrise;
                let sunset = weather.sys.sunset;
                let utcDateSunrise = new Date(sunrise*1000);
                let utcDateSunset = new Date(sunset*1000);
                
                info = {
                    'city': city,
                    'temperature': temperature,
                    'sunrise': utcDateSunrise,
                    'sunset': utcDateSunset
                }
            }
        }

        if (callback) callback(info, error);
      });
}

module.exports = getTempInfo;