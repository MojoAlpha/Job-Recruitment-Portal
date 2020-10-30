// Base URL :- http://localhost:8000/company

var express = require('express');
var bodyParser = require('body-parser')

const { isSignedIn,
       isVerified } = require('../../middleware')

var company = require('./api/company')
var details = require('./api/details')

var companyRouter = express.Router();
companyRouter.use(bodyParser.json())

companyRouter.use('/', isSignedIn, isVerified, company)
companyRouter.use('/me', isSignedIn, isVerified, details)

module.exports = companyRouter;