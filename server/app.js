require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { authenticate } = require('./middleware/authenticate');
var apiRoutes = require('./api');

var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiRoutes);

const server = require('http').createServer(app);
const port = process.env.PORT;
const ip = process.env.IP;
setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, process.env.NODE_ENV)
    })
});

module.exports = { app };
