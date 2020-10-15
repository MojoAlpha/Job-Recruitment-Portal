var express = require('express')
var bodyParser = require('body-parser')

var basic = require('./api/basic')
var vacancy = require('./api/vacancy')

var vacancyRouter = express.Router()
vacancyRouter.use(bodyParser.json())

vacancyRouter.use('/', basic)
vacancyRouter.use('/', vacancy)

module.exports = vacancyRouter;