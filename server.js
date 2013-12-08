/*!
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'

var app = express()

// express settings
require('./config/express')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 9000
app.listen(port)
console.log('NODE_ENV: '+process.env.NODE_ENV)
console.log('Express app started on port '+port)

// expose app
exports = module.exports = app
