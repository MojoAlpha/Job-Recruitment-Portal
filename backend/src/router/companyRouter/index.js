// Base URL :- http://localhost:8000/company

var express = require('express');
var bodyParser = require('body-parser')

var company = require('./api/company')
var details = require('./api/details')

var companyRouter = express.Router();
companyRouter.use(bodyParser.json())

companyRouter.use('/', company)
companyRouter.use('/me', details)

module.exports = companyRouter;