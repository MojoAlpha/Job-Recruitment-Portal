var express = require('express')
var bodyParser = require('body-parser')
var {skillSearch} = require('../controllers/search')

var searchRouter = express.Router();
searchRouter.use(bodyParser.json())

searchRouter.get('/skill', skillSearch)

module.exports = searchRouter;