const app = require('./app');

var port = process.env.PORT || 3000;

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, function () {
    console.log('RESTful API weather server started on: ' + port);
});