// Base URL :- http://localhost:8000/vacancy

var express = require('express')
var bodyParser = require('body-parser')

var basic = require('./api/basic')
var vacancy = require('./api/vacancy')
const { isSignedIn, 
        isVerified } = require('../../middleware')

var vacancyRouter = express.Router()
vacancyRouter.use(bodyParser.json())

vacancyRouter.use('/', isSignedIn, isVerified, basic)
vacancyRouter.use('/', isSignedIn, isVerified, vacancy)

module.exports = vacancyRouter;